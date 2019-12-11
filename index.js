const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')
const PORT =  process.env.PORT  || 3000

const userRouter = require('./routes/user')
const homeRouter = require('./routes/home')
const movieRouter = require('./routes/movie')

// Connecting to mongo database
try{
    mongoose.connect('mongodb+srv://movietime:movietimedbpw@ureview-fseje.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
} catch(error) {
  console.log(error)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Allows front-end and api to talk to eachother
app.use(cors())
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/users', userRouter)
app.use('/home', homeRouter)
app.use('/movie', movieRouter)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use( (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
