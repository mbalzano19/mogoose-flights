const express = require('express');
const router = express.Router();
const flightCtrl = require('../controllers/flights');
const flight = require('../models/flight');

/* GET movie create form. */
// this route is /movies/new
router.get('/new', flightCtrl.newFlight);
// GET all movies
// this route is /movies
router.get('/', flightCtrl.index)
// POST movie creation
// this route is /movies
router.post('/', flightCtrl.create)

// GET an individual movie using the id
// /movies/<some movie id>
router.get('/:id', flightCtrl.show)

module.exports = router;