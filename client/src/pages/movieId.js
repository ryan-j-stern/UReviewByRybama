import React, { Component } from 'react';
import logo from './images/UReviewLogo.png';
import { Button } from 'react-bootstrap/'
import './Search.css';


console.log(logo);

class MovieId extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   id: this.props.location.state.id,
    //   poster_path: this.props.location.state.poster_path,
    //   backdrop_path: this.props.location.state.backdrop_path,
    //   title: this.props.location.state.title,
    //   overview: this.props.location.state.overview,
    //   release_date: this.props.location.state.release_date,
    //   jwt: this.props.location.state.jwt,
    //   posts: this.props.location.state.posts
    //   redirect: false,
    //   result: ''
    // }
  } 
  render() {
    return (
      <div style={styling.mainDiv} >
  
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">UReview</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
        </li>
        </ul>
        </div>
      </nav>
  
        {/* <img src={logo} width = "400"/>
        <br></br> SEARCH:
        <div className="search">
              <input type="search" name="movie-search" value={this.props.defaultTitle} onChange={this.props.search} />
              {/* {resultList} */}
          {/* </div> */} 
  
          {/* <div class="row">
            <div class="col-sm-4">
            <br></br> column hi
            <p><a href="/watchlist">WATCHLIST</a></p>
            </div>
            <div class="col-sm-4">
            <br></br> column 2 </div>
            <div class="col-sm-4">
            <br></br> column 3 </div>
          </div> */}
          <div>
          <Button variant="danger" size="lg" block>
            Add to WishList
          </Button>
          <Button variant="warning" size="lg" block>
            Add to WatchedList
          </Button>
          </div>
  
      </div>
    );
  };  
  }
  

const styling = {
  mainDiv: {
    background: '#0f0524',
    textAlign: 'center',
    color: 'white'
  },
  signup: {
    color: 'white',
    marginRight: '30%'
  },
  buttonDiv: {
    justifyContent: 'center',

  }
}

export default MovieId;
