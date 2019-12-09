import React, { Component } from 'react';
import logo from './images/UReviewLogo.png';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'
import wishl from './images/wishlist.png';
import watchedl from './images/watchedlist.png';
import urev from './images/yourreviews.png';


console.log(logo);
console.log(wishl);
console.log(watchedl);
console.log(urev);

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
    fetch('https://rybama.herokuapp.com/' + path , {
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
          <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0">
              <div class="card-body">
                <h4>{t.movieTitle}</h4>
                <h6 className="card-title">{t.text}</h6>
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
        // console.log(t)
        return(
          <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0">
              <div class="card-body">
                <Link to={{
                   pathname: '/movie/clicked',
                   state: {
                   jwt: this.state.jwt,
                   movieId: t._id,
                   title: t.title
                          }
                  }}style={{ color: '#FFF' }}>{t.title}</Link> <br></br>

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
          <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0">
              <div class="card-body">
                <Link to={{
                   pathname: '/movie/clicked',
                   state: {
                   jwt: this.state.jwt,
                   movieId: t._id,
                   title: t.title
                          }
                }}style={{ color: '#FFF' }}>{t.title}</Link>
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

      <div style={styling.headerDiv} >
      <img src='https://i.imgur.com/5AFVMLg.png' width = "400"/>

      <u><h1>{`${this.state.username}`}'s profile</h1></u>
      <br></br>
      </div>


      <div class="container" style={styling.mainDiv}>
        <div class="row" style={styling.mainDiv} >
          <div class="col-sm-3" style={styling.mainDiv}>
          <img src={wishl} width = "270"/><br></br>
            <div>{(this.state.wishList.length == 0) ? (<p>No movies added to WishList yet.</p>) : this.renderCardsForWishList()}<br></br></div>
            <br></br>
          </div>
          <div class="col-sm-3" style={styling.mainDiv}>
          <img src={watchedl} width = "270"/><br></br>
            <div>{(this.state.watchedList.length == 0) ? (<p>No movies added to WatchedList yet.</p>) : this.renderCardsForWatchedList()}</div>
            <br></br>
          </div>
          <div class="col-sm-4" style={styling.mainDiv}>
            <img src={urev} width = "270"/><br></br>
            <div>{(this.state.reviews.length == 0) ? (<p>No reviews yet.</p>) : this.renderCardsForReviews()}</div>
          </div>
          </div>
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
  headerDiv: {
    textAlign: 'center',

  }
}

export default Profile;
