const express = require('express')
const router = express()
const mongoose = require('mongoose')

const MovieReview = require('../models/reviewModel')

const auth = require('../middleware/authorize')
const request = require('request')

// router.post('/?id', auth, (req, res) => {
//   // Create new post and save to db
//   
// })

router.get('/', auth, function(req, res) {
  request({
    uri: `https://api.themoviedb.org/3/movie/${req.headers.id}?language=en-US&api_key=`,
    qs: {
      api_key: process.env.APIKEY
    }
  }).pipe(res)
});

router.post('/', auth, (req, res) => {
  try{
    const movieReview = new MovieReview({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      movieId: req.headers.id,
      owner: req.userData.userId
    })

    MovieReview.create(movieReview, (err, movieReview) => {
      if(err) {
        res.status(500).json(err)
      } else {
        res.status(201).json(movieReview)
      }
    })
  } catch(err) {
    console.log(err)
  }
})

module.exports = router