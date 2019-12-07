const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
    unique: false
  },
  movieId: {
    type: Number,
    required: true,
    unique: false
  },
  movieTitle: {
    type: String,
    required: true,
    unique: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false
  }
})

module.exports = mongoose.model('Review', ReviewSchema)