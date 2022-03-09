const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MONGODB CONNECTED')
  } catch (error) {
    console.log(error)
    // exit with failure
    process.exit(1)
  }
}

module.exports = connectDB
