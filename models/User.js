var mongoose = require('mongoose')

//creating user schema with mongoose
var userSchema = mongoose.Schema({
  //defining fields and constraints + default values
  firstName: {
    type: String,
    required: true,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  createdAt: {
    type: Date, // in min
    default: Date.now(),
  },
  updatedAt: {
    type: Date, // in min
    default: Date.now(),
  },
})

//exporting the User model
module.exports = User = mongoose.model('biensusers', userSchema)
