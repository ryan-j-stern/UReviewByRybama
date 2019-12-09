import React, { Component } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'
import { resetWarningCache } from 'prop-types';
import Form from 'react-bootstrap/Form'
import submitbutton from './images/submit.png'
import AllReviews from './images/allreviews.png'
import LeaveReview from './images/ureviewheaders.png'
import moviereel from './images/moviereel.png'

console.log(moviereel);
console.log(AllReviews);
console.log(LeaveReview);

class MovieClicked extends React.Component{
  constructor(props) {
    super(props)
    // let resultList = null
    this.state = {
      jwt: props.location.state.jwt,
      movieId: props.location.state.movieId,
      title: props.location.state.title,
      redirect: false,
      resultBody: {},
      resultPosts: [],
      errorResult: '',
      text: ''
    }
    this.getMovie('/movie/clicked')
    console.log(props)
  }

  getMovie = (path) => {
    fetch('https://rybama.herokuapp.com' + path , {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.state.jwt}`,
        'id': this.state.movieId,
        'title': this.state.title
      },

      })
      .then((response) => {
        // console.log(response)
        if(response.status == 200 || response.status == 201) {
          // console.log(response)
          return response.text()
        } else if (response.status == 401 || response.status == 400 || response.status == 500 && this.mounted == true) {
          this.setState({
            redirect: false,
            errorResult: 'Could not search movie.'
          })
          return
        }
      })
      .then((data) => {
        console.log(data)
        let res = JSON.parse(data)
        console.log(res)
        this.mounted = true
        if(this.mounted == true) {
          this.setState({
            resultBody: res.body,
            resultPosts: res.posts
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderReviews = () => {
    // console.log("SEARCH RESULTS", this.state.resultPosts)
    if(this.state.resultPosts){
      const poster = this.state.resultPosts.map(t =>  {
        return(
          <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0" style={{maxWidth: '18%'}}>
              <div class="card-body">
              <h5><b>{t.owner.username}</b> says</h5>
              {t.text}
              </div>
          </div>
      )
    })
    return(
      <div className = "row no gutters">
      {poster}
      </div>
    )
  }
}

// Tells component where to redirect to
renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to='/movie/clicked' />
  }
}

onSubmit = (e) => {
  try{
    fetch('https://rybama.herokuapp.com' + '/movie/clicked' , {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.state.jwt}`,
      'id': this.state.movieId,
      'movietitle': this.state.title
    },
    body: JSON.stringify(this.state)
    })
    .then((response) => {
      console.log(response.status)
      if((response.status == 200 || response.status == 201) && this.mounted == true) {
        this.setState({
          redirect: true
        })
        return response.text()
      } else if ((response.status == 401 || response.status == 400 || response.status == 500 ) && this.mounted == true) {
        console.log(response)
        return this.setState({
          redirect: false,
          errorResult: 'Couldn\'t create review.'
        })
      }
    })
  }catch(e) {
    console.log("Yeah there was an error fam.")
  }
}

renderRedirect = () => {
  if (this.state.redirect) {
    window.location.reload()
  }
}

addToWishList = (e) => {
  try{
    fetch('https://rybama.herokuapp.com' + `/movie/add-to-wishlist` , {
    method: "PUT",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.state.jwt}`,
      'id': this.state.movieId,
      'title': this.state.title
    },
    body: JSON.stringify(this.state)
    })
    .then((response) => {
      console.log(response.status)
      if((response.status == 200 || response.status == 201) && this.mounted == true) {
        this.setState({
          redirect: true
        })
        return response.text()
      } else if ((response.status == 401 || response.status == 400 || response.status == 500 ) && this.mounted == true) {
        console.log(response)
        return this.setState({
          redirect: false,
          errorResult: 'Couldn\'t create review.'
        })
      }
    })
  }catch(e) {
    console.log("Yeah there was an error fam.")
  }
}

addToWatchedList = (e) => {
  try{
    console.log(this.state.title)
    fetch('https://rybama.herokuapp.com' + `/movie/add-to-watchlist` , {
    method: "PUT",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.state.jwt}`,
      'id': this.state.movieId,
      'title': this.state.title
    },
    body: JSON.stringify(this.state)
    })
    .then((response) => {
      console.log(response.status)
      if((response.status == 200 || response.status == 201) && this.mounted == true) {
        this.setState({
          redirect: true
        })
        return response.text()
      } else if ((response.status == 401 || response.status == 400 || response.status == 500 ) && this.mounted == true) {
        console.log(response)
        return this.setState({
          redirect: false,
          errorResult: 'Couldn\'t create review.'
        })
      }
    })
  }catch(e) {
    console.log("Yeah there was an error fam.")
  }
}

handleReviewChange = (e) => {
  this.setState({
    text: e.target.value
  })
  console.log(this.state.review)
}



  render(){
    // Sets query in state to be whatever the user is typing

  return (
    <div style={styling.mainDiv} >

    <NavBar location={{state: {jwt: this.state.jwt}}}/>
    <img src='https://i.imgur.com/5AFVMLg.png' width = "400"/>

    <div style={styling.cardDiv}>
    <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0" style={styling.cardDiv}>
      <div class="row no gutter" style={styling.cardDiv}>
        <div class="col-md-2" style={styling.cardDiv}>
          <img src={`https://image.tmdb.org/t/p/w500${this.state.resultBody.poster_path}`} class="card-img" style={styling.posterDiv}/>
        </div>
        <div class="col-md-6" style={styling.cardDiv} >
          <div class="card-body" style={styling.cardDiv}>
            <h1 class="card-title"><b><u>{this.state.resultBody.title} </u> </b></h1>
            <h4 class="card-text">{this.state.resultBody.tagline}</h4><br></br>
            <h5 class="card-text">{this.state.resultBody.overview}</h5>

            </div>
          </div>
        </div>
        <div class = "btn-toolbar">
        <br></br>
        <div><Button variant="warning" onClick={this.addToWishList}>Add to Wish List</Button></div>
        <div><Button variant="danger" onClick={this.addToWatchedList}>Add to Watched List</Button></div>
        </div>
      </div>
      <img src={AllReviews} width = "400"/>
    </div>

    <div style={styling.reviewDiv}>
      <div>{(this.state.resultPosts.length == 0) ? (<p>No reviews yet.</p>) : this.renderReviews()}</div>
    </div>


    <div class="form-group row" style={styling.mainDiv}>
      <div class="col-xs-5">
          <Form>
            <Form.Group>
            <img src={LeaveReview} width = "450"/>
            <Form.Control as="textarea" rows="3" value={this.state.text} onChange={this.handleReviewChange} placeholder='You be the critic.'/>
            </Form.Group>
          </Form>
          {/* <input type="input" name="review" value={this.state.review} onChange={this.handleReviewChange} /><br></br> */}
          <Button variant="link" onClick={this.onSubmit}>
          <img src={submitbutton} width = "200"/>
          </Button>
          </div>
          {this.renderRedirect()}
      </div>
      <img src={moviereel} width="400"/> <img src={moviereel} width="400"/>  <img src={moviereel} width="400"/>
    <br></br>
    </div>


    );
  }
};


const styling = {
  mainDiv: {
    width: '100%',
    height: '100%',
    background: '#0f0524',
    textAlign: 'center',
    color: 'white',
    outline: 'none',
    justifyContent: 'center',
  },
  reviewDiv: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    background: '#0f0524',
    color: 'white'
  },
  cardDiv: {
    justifyContent: 'center',
    background: '#0f0524',
    color: 'white',

  },
  posterDiv: {
    border: '5px',
    outline: '5px',
  },
  deckDiv: {
    justifyContent: 'center',
    alignContent: 'center',
    outline: 'none',
    border: 'none',
    overflowWrap: 'normal',
    marginLeft:'7%',
    background: '#0f0524',
  }
}

export default MovieClicked;
