const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

function newTicket(req, res) {
    // find all the existing performers
    Ticket.find({})
        // then we'll render the new form for adding a performer
        .then(tickets => {
            res.render('tickets/new', {tickets: tickets})
        })
        // handle any errors if they occur
        .catch(err => {
            console.log('error in newPerformer', err)

            res.send('error in new performer check terminal')
        })
}

function create(req, res) {
    console.log('req.body in ticket create \n', req.body)
    // we want to handle date formatting
    // then we send the req.body to a model method to create
    Ticket.create(req.body)
        .then(ticket => {
            console.log('the new ticket', ticket)
            

            res.redirect('/flights')
        })
        // handle any errors if they occur
        .catch(err => {
            console.log('error in newticket', err)

            res.send('error in new ticket check terminal')
        })
}
// // /performers/movies/<movieId>/addToCast
// router.post('/movies/:movieId/addToCast', performersCtrl.addToCast)
function addTicket(req, res) {
    // we get the flight by its id
    // then we add a ticket using their id(which will come from our request body)
    // push the performer id into the ticket array
    // save the flight doc
    // redirect to the flight show page
    Flight.findById(req.params.flightId)
        .then(flightDoc => {
            flightDoc.tickets.push(req.body.ticketId)

            return flightDoc.save()
        })
        .then(flightDoc => {
            res.redirect(`/flights/${flightDoc.id}`)
        })
        .catch(err => {
            console.log('error in newticket', err)

            res.send('error in addTicket check terminal')
        })
}

module.exports = {
    new: newTicket,
    create,
    addTicket
}