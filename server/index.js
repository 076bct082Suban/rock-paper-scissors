const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const {readFile} = require("fs").promises

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())


const script = require("./api/script.js")
app.use('/api/script', script)

app.use('/client', express.static('client'))

app.get('/', async(req, res) => {
  res.send( await readFile("./index.html", "utf-8"));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})