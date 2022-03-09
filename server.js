const express = require('express')
const server = express()
var cors = require('cors')

var bodyParser = require('body-parser')
server.use(express.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.use(cors({ credentials: true, origin: true }))

server.use(express.static(__dirname + '/public'))

// importing from the database
const connectDB = require('./config/db')
// connecting to the database
connectDB()

//running the express server into 5000 port
var PORT = 5000 || process.env.PORT

//using the product api
var productRoute = require('./routes/Product')
server.use('/api/products', productRoute)
//using the user api
var userRoute = require('./routes/User')
server.use('/api/users', userRoute)

server.listen(PORT, () => {
  console.log(`SERVER RUNNING IN PORT ${PORT}`)
})
