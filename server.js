const express = require('express');
const app = express()
const cors = require('cors')
const data = require("./data/short-term-rental-registrations-data.json")

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.send(data)
})


app.listen(2323, () => {
    console.log('RUNNING ON PORT 2323')
})


const findRentals = () => {
    let count = 0;
    let postal = 'M4M'
    console.log(data.length)
    for (rental of data) {
        if (rental.postal_code === postal) {
            count++
        } else {
            console.log("no match")
        }
    }
    console.log(count)
}

findRentals()