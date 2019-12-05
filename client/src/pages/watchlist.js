import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import logo from './images/UReviewLogo.png';

console.log(logo);

class Watchlist extends Component {
  render() {
    return(
      <div >
        <div style={styling.outerDiv}>
          <img src={logo} width = "400"/>
          <div>
            
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

export default Watchlist;
