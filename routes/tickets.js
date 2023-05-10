const express = require('express')
const router = express.Router()
const ticketsCtrl = require('../controllers/tickets')

// /tickets/new
router.get('/new', ticketsCtrl.new)
// /tickets
router.post('/', ticketsCtrl.create)
// /tickets/flights/<flightId>/addTicket
router.post('/flights/:id/tickets/addTicket', ticketsCtrl.addTicket)

module.exports = router