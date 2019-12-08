import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class NavBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
      jwt: props.location.state.jwt,
      redirect: false
    }
    console.log('NAVBAR')
    console.log(this.state.jwt)
  }
  render() {
    return(


      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">UReview</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
          <Link to={{
              pathname: '/dashboard',
              state: {
                jwt: this.state.jwt
              }
            }}>Dashboard </Link> <br></br>
        </li> ///
        <li class="nav-item">
          <Link to={{
              pathname: '/users/profile',
              state: {
                jwt: this.state.jwt
              }
            }}> Profile </Link>
        </li> ///
        <li class="nav-item">
          <Link to={{
              pathname: '/'
            }}> Logout</Link>

        </li>
        </ul>
        </div>
      </nav>

    )
  }
}


const styling = {
  mainDiv: {
    textAlign: 'center',
    color:'black'
  }
}

export default NavBar;
