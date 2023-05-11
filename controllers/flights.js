////////////////////////////////
// Import Dependencies
////////////////////////////////
// import the movie model
const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

////////////////////////////////////////////////////////////////
// Define our controller functions
////////////////////////////////////////////////////////////////
function newFlight(req, res) {
    console.log('the new route has been hit')
    res.render('flights/new')
}

function create(req, res) {
    console.log('this is the req.body in create\n', req.body)
    // !! converts to boolean
    // req.body.nowShowing = !!req.body.nowShowing

    // remove white space from my strings
    // req.body.cast = req.body.cast.replace(/\s*, \s*g, ','/)
    console.log('this is the req.body halfway thru conversion\n', req.body)
    // req.body.cast = req.body.cast.split(',')
    console.log('this is the req.body after data conversion\n', req.body)

    // the mongoose model method create adds a document to the db
    // Movie.create(req.body, function(err, movieDoc) {
    //     if (err) {
    //         console.log('==========err')
    //         console.log(err)
    //         console.log('=============')

    //         return res.send('err creating, check terminal')
    //     }
    //     console.log('===== below is the movie from the db =====')
    //     console.log(movieDoc)
    //     console.log('==========================================')

    //     res.send(`Movie Created: ${movieDoc.title}`)
    // })
// mongoose model method returns a promise (thenable)
    Flight.create(req.body)
        .then(flightDoc => {
            console.log('===== below is the movie from the db =====')
            console.log(flightDoc)
            console.log('==========================================')

            // res.send(`Movie Created: ${movieDoc.title}`)
            return res.redirect(`/flights/${flightDoc.id}`)
        })
        .catch(err => {
            console.log('==========err')
            console.log(err)
            console.log('=============')

            return res.send('err creating, check terminal')
        })

    // res.send('hit the post route for movies')
}

function index(req, res) {
    // tell the model, find all the movies in the db
    // send those movies back as a response
    //  seeting empty object finds everything
    Flight.find({})
        .then(flightDocs => {
            console.log('found all the movies\n', flightDocs)

            res.render('flights/index', { flights: flightDocs })
        })
        .catch(err => {
            console.log('==========err')
            console.log(err)
            console.log('=============')

            return res.send('err creating, check terminal')
        })
}

function show(req, res) {
    console.log('These are request parameters\n', req.params);
    Flight.findById(req.params.id)
        .populate('tickets')
        .then(flight => {
            console.log(flight)
            console.log('hey there')
            return Ticket.find({})
                .then(tickets => {
                    return { flight: flight, tickets: tickets }
                })
                .catch(error => console.error(error));
        })
        .then(data => {
            res.render('flights/show', { flight: data.flight, tickets: data.tickets });
        })
        .catch(err => {
            console.log('Error:', err);
            res.send('Error occurred. Please check the terminal for details.');
        });
}


////////////////////////////////
// Export our modules
////////////////////////////////
module.exports = {
    // can export like this
    newFlight,
    // or like this
    create,
    index,
    show
}