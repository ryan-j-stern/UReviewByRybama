import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import loginlit from './images/logindim.png'
import submitbutton from './images/submit.png'

console.log(loginlit);
console.log(submitbutton);

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      jwt: '',
      redirect: false,
      result: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

// Will set a variable to true when component is fully mounted
  componentDidMount() {
    this.mounted = true
  }

// Sets username in state to be whatever the user is typing
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

// Sets password in state to be whatever the user is typing
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

// Send the state to the api, receives data back and displays that data, JSON WEB TOKEN is given back to us to allow
// user to access needed routes
  postAndFetchData = (path) => {
    fetch('https://rybama.herokuapp.com' + path , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then((response) => {
        console.log(response.status)
        if(response.status == 200 || response.status == 201) {
          return response.text()
        } else if (response.status == 401 || response.status == 400 || response.status == 500 && this.mounted == true) {
          this.setState({
            redirect: false,
            result: 'Username or password incorrect.'
          })
          return
        }
      })
      .then((data) => {
        let res = JSON.parse(data)
        res = res.token
        if(this.mounted == true) {
          this.setState({
            jwt: res
          })
        }
        console.log(this.state.jwt)
      })
      .then(() => {this.setRedirect()})
      .catch(() => {
        console.log('didnt post')
      })
  }

// Calls the postAndFetch function when submit button is clicked
  onSubmit = (e) => {
    this.postAndFetchData('/users/login')
  }

// Prepares page to be redirected
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  // Tells component where to redirect to
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/dashboard',
        state: { jwt: this.state.jwt }
      }}/>
    }
  }

// Sets variable to false when ready to leave page
  componentWillUnmount() {
    this.mounted = false
  }

  // Sets variable to false when ready to leave page
  componentWillUnmount() {
    this.mounted = false
  }

  // Displays format of page and styling
  render() {
    return(
      <div style={styling.mainDiv} >

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="https://rybama.herokuapp.com/">UReview</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="https://rybama.herokuapp.com/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://rybama.herokuapp.com/users/login/">Login </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://rybama.herokuapp.com/users/signup/">Signup</a>
          </li>
          </ul>
          </div>
      </nav>

        <img src={loginlit} width = "600"/>
        <div style={styling.outerDiv}>
          <Form style={styling.formDiv}>
            <FormGroup>
              <FormLabel>Username</FormLabel>
              <FormControl type="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <Form.Control type="password" placeholder="password"  value={this.state.password} onChange={this.handlePasswordChange}/>
            </FormGroup>
            <p>{this.state.result}</p>
            <div>
              {this.renderRedirect()}
              <Button variant="link" onClick={(e) => this.onSubmit()} >
              <img src={submitbutton} width = "200"/>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const styling = {
  mainDiv: {
    background: '#0f0524',
    color: 'white'
  },
  formDiv: {
    width: '50%',
    background: '#0f0524'
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8%',
    background: '#0f0524'
  }
}

export default Login;
