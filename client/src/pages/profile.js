import React, { Component } from 'react';
import logo from './images/UReviewLogo.png';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'

console.log(logo);

class Profile extends Component{
  constructor(props) {
    super(props)
    // let resultList = null
    console.log(props)
    this.state = {
      jwt: props.location.state.jwt,
      username: '',
      wishList: [{}],
      watchedList: [{}],
      reviews: [{}],
      redirect: false
    }
    this.getUserProfile('/users/profile')
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
          pathname: '/search-results',
          state: { listOfMovies: this.state.result,
          jwt: this.state.jwt }
        }}/>
      }
    }
    getUserProfile = (path) => {
      fetch('http://localhost:3000' + path , {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.state.jwt}`
        }
        })
        .then((response) => {
          // console.log(response)
          if(response.status == 200 || response.status == 201) {
            // console.log(response)
            return response.text()
          } else if (response.status == 401 || response.status == 400 || response.status == 500 && this.mounted == true) {
            this.setState({
              redirect: false,
              errorResult: 'Could not search movie.'
            })
            return
          }
        })
        .then((data) => {
          console.log(data)
          let res = JSON.parse(data)
          console.log(res)
          this.mounted = true
          if(this.mounted == true) {
            this.setState({
              username: res.username,
              wishList: res.wishList,
              watchedList: res.watchedList,
              reviews: res.reviews
            })
            console.log(this.state.username)
          }
          console.log(this.state.username)
        })
        .catch((err) => {
          console.log(err)
        })
    }
   

    render(){
    return (
      <div style={styling.mainDiv} >

      <NavBar location={{state: {jwt: this.state.jwt}}}/>

      <div>
        <h1>{`${this.state.username}`}</h1>
        <div>Insert WishList</div>
        <div>Insert WatchedList</div>
        <div>Insert Reviews</div>
      </div>
      </div>
      );
    }
};


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

export default Profile;
