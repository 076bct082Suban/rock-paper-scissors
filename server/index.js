const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const {readFile} = require("fs").promises
const socket = require("socket.io")
const Connection = require("./connection.js")


const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
const connection = new Connection()

const script = require("./api/script.js")
app.use('/api/script', script)

app.use('/client', express.static('client'))

app.get('/', async(req, res) => {
  res.send( await readFile("./index.html", "utf-8"));
})

let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

let io = socket(server)

io.on("connection", (socket) => {
  console.log(`made connection ${socket.id}`)

  socket.on("createNewUser",(data) => {
    console.log(data)
    connection.createNewUser(data.username, socket.id)
  } )

  socket.on("setSearching", () => {
    connection.setSearching(socket.id)
  })
})