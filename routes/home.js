const express = require('express')
const router = express()
const mongoose = require('mongoose')

const auth = require('../middleware/authorize')
const request = require('request')

router.get('/', auth, (req, res) => {
  request({
    uri: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=`,
    qs: {
      api_key: '311126e773585af516e7a99d4f8e9565'
    }
  }).pipe(res)
});


module.exports = router
