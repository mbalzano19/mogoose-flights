const express = require('express')
const router = express.Router()
const ticketsCtrl = require('../controllers/tickets')

// /tickets/new
router.get('/flights/:id/new', ticketsCtrl.new)
// /tickets
router.post('/', ticketsCtrl.create)
// /tickets/flights/<flightId>//tickets/addTicket
router.get('/flights/:id/addTicket', ticketsCtrl.addTicket)

module.exports = router