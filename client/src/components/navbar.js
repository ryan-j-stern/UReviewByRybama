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

      <Nav>
          <Link to={{
              pathname: '/dashboard',
              state: {
                jwt: this.state.jwt
              }
            }}>Dashboard </Link> <br></br>
          <Link to={{
              pathname: '/users/profile',
              state: {
                jwt: this.state.jwt
              }
            }}> Profile </Link>
          <Link to={{
              pathname: '/'
            }}> Logout</Link>

        </Nav>

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
