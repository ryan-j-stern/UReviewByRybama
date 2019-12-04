import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import logo from './images/UReviewLogo.png'; // Tell Webpack this JS file uses this image
import banner from './images/MovieBanner.jpg';


console.log(logo);
console.log(banner);


// Set up landing page with two buttons that will link user to either the signup page or the login page
class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >

      <div> <img src={logo} width = "800"/> </div>
      <div> <img src={banner} width = "1000"/> </div>

//SEARCH FUNCTION BEING EDITED

    </div>
    )
  }
}

// Styling the component
const styling = {
  mainDiv: {
    background: '#0f0524',
    textAlign: 'center'
  },
  buttons: {


  },
  signup: {

    marginRight: '30%'
  },
  buttonDiv: {


    justifyContent: 'center',

  }
}

export default Landing;
