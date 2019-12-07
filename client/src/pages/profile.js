import React, { Component } from 'react';
import logo from './images/UReviewLogo.png';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'

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

  renderCardsForReviews = () => {
    console.log("Reviews", this.state.reviews)
    if(this.state.reviews){
      const poster = this.state.reviews.map(t =>  {
        console.log(t)
        return(
          <div class="card">
              <div class="card-body">
              {/* <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} width = "300" style={styling.img}/> */}

                {/* <Link to={{
                           pathname: '/movie/clicked',
                   state: {
                   jwt: this.state.jwt,
                   id: t.id,
                          } */}
                <h2 className="card-title">{t.text}</h2> 

              </div>
          </div>
      )
    })
    return(
      <div className = "row">
      {poster}
      </div>
    )
  }
}

  renderCardsForWatchedList = () => {
    console.log("WishList", this.state.watchedList)
    if(this.state.watchedList){
      const poster = this.state.watchedList.map(t =>  {
        console.log(t)
        return(
          <div class="card">
              <div class="card-body">
              {/* <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} width = "300" style={styling.img}/> */}

                <Link to={{
                   pathname: '/movie/clicked',
                   state: {
                   jwt: this.state.jwt,
                   id: t.id,
                          }
                }}><h2 className="card-title">{t.title}</h2> </Link>

              </div>
          </div>
      )
    })
    return(
      <div className = "row">
      {poster}
      </div>
    )
  }
}
  renderCardsForWishList = () => {
    console.log("WishList", this.state.wishList)
    if(this.state.wishList){
      const poster = this.state.wishList.map(t =>  {
        console.log(t)
        return(
          <div class="card">
              <div class="card-body">
              {/* <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} width = "300" style={styling.img}/> */}

                <Link to={{
                           pathname: '/movie/clicked',
                   state: {
                   jwt: this.state.jwt,
                   id: t.id,
                          }
                }}><h2 className="card-title">{t.title}</h2> </Link>

              </div>
          </div>
      )
    })
    return(
      <div className = "row">
      {poster}
      </div>
    )
  }
}



  render(){
  return (
    <div style={styling.mainDiv} >

    <NavBar location={{state: {jwt: this.state.jwt}}}/>

    <div>
      <h1>{`${this.state.username}`}</h1>
      <h2>WishList</h2>
      <div>{(this.state.wishList.length == 0) ? (<p>No movies added to WishList yet.</p>) : this.renderCardsForWishList()}</div>
      <h2>WatchedList</h2>
      <div>{(this.state.watchedList.length == 0) ? (<p>No movies added to WatchedList yet.</p>) : this.renderCardsForWatchedList()}</div>
      <h2>Your Reviews</h2>
      <div>{(this.state.reviews.length == 0) ? (<p>No reviews yet.</p>) : this.renderCardsForReviews()}</div>
    </div>
    </div>
  );}
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
