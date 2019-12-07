import React, { Component } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'
import moviereel from './images/moviereel.png'

console.log(moviereel);

class SearchResults extends React.Component{
  constructor(props) {
    super(props)
    // let resultList = null
    this.state = {
      jwt: props.location.state.jwt,
      query: '',
      redirect: false,
      result: [{}],
      errorResult: '',
      searchResults: this.props.location.state.listOfMovies.results
    }
  }

      renderCards = () => {
            console.log("SEARCH RESULTS", this.state.searchResults)
            if(this.state.searchResults){
              const poster = this.state.searchResults.map(t =>  {
                return(
                  <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0" style={{maxWidth: '18%'}}>
                      <div class="card-body">
                      <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} width = "300" style={styling.img}/>

                        <Link to={{
                           pathname: '/movie/clicked',
                           state: {
                           jwt: this.state.jwt,
                           id: t.id,
                          }
                      }} style={{ color: '#FFF' }}><h4 className="card-title">{t.title}</h4> </Link>

                      </div>
                  </div>
              )
            })
            return(
              <div className = "row no gutters">
              {poster}
              </div>
            )
          }
        }




    render(){
      // Sets query in state to be whatever the user is typing

    return (
      <div style={styling.mainDiv} >
      <NavBar location={{state: {jwt: this.state.jwt}}}/>

        <img src='https://i.imgur.com/5AFVMLg.png' width = "400"/>

        <div class="row no gutters">
          <div style={styling.deckDiv}>
            {this.renderCards()}
          </div>
        </div>
        <img src={moviereel} width="400"/> <img src={moviereel} width="400"/>  <img src={moviereel} width="400"/>  
      </div>
      );
    }
};


const styling = {
  mainDiv: {
    background: '#0f0524',
    textAlign: 'center',
    color: 'white',
    outline: 'none',
    justifyContent: 'center',
  },
  signup: {
    color: 'white',
    marginRight: '30%'
  },
  buttonDiv: {
    justifyContent: 'center',
  },
  deckDiv: {
    justifyContent: 'center',
    alignContent: 'center',
    outline: 'none',
    border: 'none',
    overflowWrap: 'normal',
    marginLeft:'7%'
  }
}

export default SearchResults;
