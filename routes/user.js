const express = require('express')
const router = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const auth = require('../middleware/authorize')

const User = require('../models/userModel')
const MovieReview = require('../models/reviewModel')

// Retrieves all users stored in the database
router.get('/', function(req, res) {
  User.find()
  .exec()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Encrypts the password given by the user, if succesfully encrypted creates a new user object and stores in the database
router.post('/signup', function(req, res) {
  try{
    bcrypt.hash(req.body.password, 10, (err, encryption) => {
      if(err) {
        res.status(500).json(err)
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: encryption,
          wishList: new Array(),
          seen: new Array()
        })

        User.create(user, (err, user) => {
          if(err) {
            res.status(500).json(err)
          } else {
            console.log(user)
            res.status(201).json({message: `user ${user.username} created.`})
          }
        })
      }
    })
  } catch(err) {
    console.log('Sorry fam')
  }

})

/* Finds user by username, compares password provided to the encrypted password stored in the database,
   if they match up, creates a webtoken that will be authenticated and will allow the user access to certain information
   within the application
*/
router.post('/login', function(req, res) {
  try {
    User.findOne({username: req.body.username})
    .exec()
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if(err) {
          res.status(401).json({
            message: 'Auth failed.'
          })
        } else if(same) {
          const token = jwt.sign({
            userId: user.id,
            username: user.username,
            wishList: user.wishList,
            watchedList: user.watchedList
          },
          'movietimedbpw',
          {
            expiresIn: '1h'
          })

          res.status(200).json({
            message: 'Auth successul.',
            token: token
          })
          console.log(user)
        } else {
          res.status(401).json({
            message: 'Auth failed.'
          })
        }
      })
    })
    .catch(() => {
      res.status(404).json({
        message: 'Auth failed.'
      })
    })
  } catch(err) {
    console.log('nah')
  }

})

router.get('/profile', auth, (req, res) => {
  User.findById({_id: req.userData.userId})
  .exec()
  .then(user => {
    MovieReview.find({owner: req.userData.userId})
    .exec()
    .then(reviews => {
      res.status(200).json({
        username: user.username,
        wishList: user.wishList,
        watchedList: user.moviesWatched,
        reviews: reviews
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: err
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: err
    })
  })
})

// Deletes user based off id provided in url
router.delete('/:id', function(req, res) {
  User.findByIdAndDelete({_id: req.params.id})
  .exec()
  .then(() => {
    res.status(200).json({
      message: 'User deleted.'
    })
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

module.exports = router
