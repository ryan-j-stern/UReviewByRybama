import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import logo from './images/UReviewLogo.png'; // Tell Webpack this JS file uses this image
import banner from './images/MovieBanner.jpg';
import signuplogo from './images/signupdim.png';
import loginlogo from './images/logindim.png';

console.log(logo);
console.log(banner);
console.log(loginlogo);
console.log(signuplogo);

// Set up landing page with two buttons that will link user to either the signup page or the login page
class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >

      <div> <img src={logo} width = "800"/> </div>
      <div> <img src={banner} width = "1000"/> </div>
      <div style={styling.buttonDiv}>
        <Link to="/users/signup"><input type="image" src={signuplogo} width = "600"/></Link>
        <Link to="/users/login"><input type="image" src={loginlogo} width = "600"/></Link>
      </div>
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
