const express = require('express')
const router = express()
const mongoose = require('mongoose')
const request = require('request')

const MovieReview = require('../models/reviewModel')

const auth = require('../middleware/authorize')

router.get('/', auth, (req, res) => {
  request({
    uri: `https://api.themoviedb.org/3/movie/${req.headers.id}?language=en-US&api_key=`,
    qs: {
      api_key: process.env.APIKEY
    }
  }, (err, response, body) => {
    if(err) {
      res.status(500).json({
        message: "Error."
      })
    }
    const finalRes = JSON.parse(body)
    MovieReview.find({movieId: req.headers.id})
    .exec()
    .then(reviews => {
      res.status(200).json({
        body: finalRes,
        posts: reviews
      })
    })
    .catch(err => {
     res.status(500).json({
       message: "Could not retrieve information."
     })
    })
  })
})

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