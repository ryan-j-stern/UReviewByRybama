import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import logo from './images/UReviewLogo.png';


console.log(logo);

class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [ {} ],
      jwt: this.props.location.state.jwt
    }
    this.postAndFetchData('wishlist')
  }

  postAndFetchData = (path) => {
    fetch('http:/' + path , {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      let parsed = JSON.parse(data)
      this.setState({result: parsed.movies})
    })
    .catch(() => {
      console.log('didnt post')
    })
  }

  mapMovies = () => {
    return this.state.result.map((movie) =>
      <div>
        <li>{movie.name}</li>
        <br>
        </br>
        <li></li>
      </div>
    )
  }

  render() {
    return(
      <div >
        <div style={styling.outerDiv}>
          <img src={logo} width = "400"/>
          <div>
            <ul>{this.mapMovies()}</ul>
            <Link to={{
              pathname: '/users/dashboard',
              state: { jwt: this.state.jwt }
            }}> DASHBOARD </Link>
          </div>
        </div>
      </div>
    )
  }
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

export default Wishlist;
