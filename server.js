const express = require('express');
const app = express()
const cors = require('cors')
const data = require("./data/short-term-rental-registrations-data.json")
const mock = require("./data/mock-data.json")

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.send(data)
})

app.get("/mock", (req, res) => {
    res.send(mock)
})


app.listen(2323, () => {
    console.log('RUNNING ON PORT 2323')
})

