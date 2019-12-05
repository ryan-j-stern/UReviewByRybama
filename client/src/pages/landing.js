import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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


      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">UReview</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users/login">Login </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users/signup">Signup</a>
        </li>
        </ul>
        </div>
      </nav>

      <div> <img src={logo} width = "700"/> </div>
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
