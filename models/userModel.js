const mongoose = require('mongoose')

// Create the schema (or template) for what data a user will contain
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  wishList: {
    type: [],
    required: true,
    unique: false
  },
  moviesWatched: {
    type: [],
    required: true,
    unique: false
  }
})

// Create and export the model for the users
module.exports = mongoose.model('User', userSchema)