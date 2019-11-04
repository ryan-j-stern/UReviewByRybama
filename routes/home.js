const express = require('express')
const router = express()
const mongoose = require('mongoose')

const auth = require('../middleware/authorize')
const request = require('request')

router.get('/', auth, (req, res) => {
  request({
    uri: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=`,
    qs: {
      api_key: process.env.APIKEY
    }
  }).pipe(res)
});


module.exports = router