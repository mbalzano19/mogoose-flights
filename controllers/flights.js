////////////////////////////////
// Import Dependencies
////////////////////////////////
// import the movie model
const Flight = require('../models/flight')

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
    //  we're going to use model method findById
    // findById takes a mongoDb id and finds appropriate documents
    console.log('these are reqquest parameters\n', req.params)
    Flight.findById(req.params.id)
        .then(flight => {
            console.log('this is the movie in how\n', flight)

            // res.send(`found ${movie.title}`)
            res.render('flights/show', {flight: flight})
        })
        .catch(err => {
            console.log('==========err')
            console.log(err)
            console.log('=============')

            return res.send('err creating, check terminal')
        })

    // res.send(req.params.id)
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