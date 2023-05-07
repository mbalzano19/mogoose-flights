require('dotenv').config()
const mongoose = require('../config/database')
const Flight = require('./flight')

const db = mongoose.connection
console.log('db in seed file', db)

db.on('open', () => {
    const startFlights = [
    {
        airline: 'American', 
        airport: 'DFW', 
        flightNo: 50, 
        departs: 1998
    }, 
]

Flight.deleteMany({})
.then(deletedFlights => {
    console.log('this is what deleteMany returns', deletedFlights)
    // after that we run a create to insert those documents into the db
    Flight.create(startFlights)
        .then(data => {
            console.log('this is what we created', data)
            db.close()
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})
.catch(err => {
    console.log(err)
    db.close()
})
})