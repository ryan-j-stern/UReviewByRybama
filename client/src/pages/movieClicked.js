import React, { Component } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'
import { resetWarningCache } from 'prop-types';

class SearchResults extends React.Component{
  constructor(props) {
    super(props)
    // let resultList = null
    this.state = {
      jwt: props.location.state.jwt,
      movieId: props.location.state.id,
      title: props.location.state.title,
      redirect: false,
      resultBody: {},
      resultPosts: [],
      errorResult: ''
    }
    this.getMovie('/movie/clicked')
  }

  getMovie = (path) => {
    fetch('http://localhost:3000' + path , {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.state.jwt}`,
        'id': this.state.movieId,
        'title': this.state.title
      }
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
    console.log("SEARCH RESULTS", this.state.resultPosts)
    if(this.state.resultPosts){
      const poster = this.state.resultPosts.map(t =>  {
        return(
          <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0" style={{maxWidth: '20rem'}}>
              <div class="card-body">
              <h5>{t.owner.username} says</h5>
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



  render(){
    // Sets query in state to be whatever the user is typing

  return (
    <div style={styling.mainDiv} >
    <NavBar location={{state: {jwt: this.state.jwt}}}/>

    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src={`https://image.tmdb.org/t/p/w500${this.state.resultBody.poster_path}`} class="card-img"/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{this.state.resultBody.title}</h5>
            <p class="card-text">{this.state.resultBody.tagline}</p>
            <p class="card-text"><small class="text-muted">{this.state.resultBody.overview}</small></p>
          </div>
        </div>
      </div>
    </div>

    <div style={styling.reviewDiv}>

    </div>

  </div>


    );
  }
};


const styling = {
  mainDiv: {
    background: '#0f0524',
    textAlign: 'center',
    color: 'white',
    outline: 'none',
    justifyContent: 'center',
  },
  signup: {
    color: 'white',
    marginRight: '30%'
  },
  reviewDiv: {
    justifyContent: 'left',
  },
  deckDiv: {
    justifyContent: 'center',
    alignContent: 'center',
    outline: 'none',
    border: 'none',
    overflowWrap: 'normal',
    marginLeft:'7%'
  }
}

export default SearchResults;
