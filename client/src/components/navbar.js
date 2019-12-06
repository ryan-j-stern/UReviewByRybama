import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
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
          }}>Dashboard</Link><br></br>
        <Link to={{
            pathname: '/users/profile',
            state: {
              jwt: this.state.jwt
            }
          }}>Profile</Link><br></br>
        <Link to={{
            pathname: '/'
          }}>Logout</Link>
        
      </Nav>
    )
  }
}

export default NavBar;

