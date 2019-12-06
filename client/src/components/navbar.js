import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class NavBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
      jwt: props.jwt,
      redirect: false
    }
    // console.log('NAVBAR')
    // console.log(this.state.jwt)
  }
  render() {
    return(
      <Nav>
        
        <Link to={{
            pathname: '/users/profile',
            jwt: this.state.jwt
          }}>Profile</Link>
     
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}

export default NavBar;

