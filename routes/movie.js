const express = require('express')
const router = express()
const mongoose = require('mongoose')
const request = require('request')

const MovieReview = require('../models/reviewModel')
const User = require('../models/userModel')

const auth = require('../middleware/authorize')

router.get('/', auth, (req, res) => {
  // Making the API call to movie db
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
    
    // Turn the returned string into JSON
    const finalRes = JSON.parse(body)

    // Getting all review posts associated with the individual movie
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
    console.log(req.userData)
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

router.put('/add-to-wishlist', auth, (req, res) => {
  try {
    let movieWish = {
      _id: req.headers.id,
      title: req.headers.title
    }
    User.findByIdAndUpdate(req.userData.userId,  { "$push": { "wishList": movieWish } }, {new: true})
    .exec()
    .then(user => {
      console.log(user)
      res.json(user.wishList)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  } catch(err) {
    res.status(500).json({
      message: err
    })
    console.log(err)
  }
})

router.put('/add-to-watchlist', auth, (req, res) => {
  try {
    let movieWish = {
      _id: req.headers.id,
      title: req.headers.title
    }
    User.findByIdAndUpdate(req.userData.userId,  { "$push": { "moviesWatched": movieWish } }, {new: true})
    .exec()
    .then(user => {
      console.log(user)
      res.json(user.moviesWatched)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  } catch(err) {
    res.status(500).json({
      message: err
    })
    console.log(err)
  }
})

router.get('/search', auth, (req, res) => {
  try {
    console.log(req.headers.query)
    request({
      uri: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${req.headers.query}&page=1&include_adult=false`
    }, (err, response, body) => {
      if(err) {
        console.log(err)
        res.status(500).json({
          message: "Error."
        })
      }
      const results = JSON.parse(body)
      res.json(results)
    })
  } catch(err) {
    console.log(err)
  }
  
})

module.exports = router