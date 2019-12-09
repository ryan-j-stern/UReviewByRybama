import React, { Component } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'
import submitbutton from './images/submit.png'
import moviereel from './images/moviereel.png'

console.log(moviereel);
console.log(submitbutton);

class Search extends Component{
  constructor(props) {
    super(props)
    // let resultList = null
    this.state = {
      jwt: props.location.state.jwt,
      query: '',
      redirect: false,
      result: [{}],
      errorResult: '',
      popularMovies: [{}]
    }
    this.getPopularMovies('/home')
  }

     handleQueryChange = (e) => {
      this.setState({
        query: e.target.value
      })
      console.log(this.state.query)
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
    getPopularMovies = (path) => {
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
          // console.log(data)
          let res = JSON.parse(data)
          // console.log(res)
          res = res.results
          if(this.mounted == true) {
            this.setState({
              popularMovies: res
            })
          }
          console.log(this.state.popularMovies)
        })
        .catch((err) => {
          console.log(err)
        })
    }

     postAndFetchData = (path) => {
      fetch('http://localhost:3000' + path , {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.state.jwt}`
        },
        body: JSON.stringify(this.state)
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
          // console.log(data)
          let res = JSON.parse(data)
          // console.log(res)
          res = res.results
          if(this.mounted == true) {
            this.setState({
              result: res
            })
          }
          // console.log(this.state.result)
        })
        .then(() => {this.setRedirect()})
        .catch((err) => {
          console.log(err)
        })
    }

    // Calls the postAndFetch function when submit button is clicked
     onSubmit = (e) => {
      this.postAndFetchData('/movie/search')
    }

    // Sets variable to false when ready to leave page
     componentWillUnmount = () => {
      this.mounted = false
    }

    // Will set a variable to true when component is fully mounted
     componentDidMount = () => {
      this.mounted = true
    }


      renderCards = () => {
            console.log("POPULAR MOVIES", this.state.popularMovies)
            if(this.state.popularMovies){
              const poster = this.state.popularMovies.map(t =>  {
                return(
                  <div class="card border-right-0 border-top-0 border-bottom-0 border-left-0" style={{maxWidth: '18%'}}>
                      <div class="card-body">
                      <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} width = "300" style={styling.img}/>

                        <Link to={{
                           pathname: '/movie/clicked',
                           state: {
                           jwt: this.state.jwt,
                           movieId: t.id,
                           title: t.title
                          }
                  }} style={{ color: '#FFF' }}><h4 className="card-title">{t.title}</h4> </Link> <br></br>

                      </div>
                  </div>
              )
            })
            return(
              <div className = "row no gutters" >
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

        <img src='https://i.imgur.com/5AFVMLg.png' width = "400"/><br></br>
        <h4>SEARCH:</h4>
        <div className="search">
        {this.renderRedirect()}
              <input type="input" name="query" value={this.state.query} onChange={this.handleQueryChange} /><br></br>
              <Button variant="link" onClick={this.onSubmit}>
              <img src={submitbutton} width = "200"/>
              </Button>
        </div>
      <div class="row no gutters">
        <div style={styling.deckDiv}>
                {this.renderCards()}
            </div>
        </div>
            <img src={moviereel} width="400"/> <img src={moviereel} width="400"/>  <img src={moviereel} width="400"/>
          <br></br>
      </div>
      );
    }
};


const styling = {
  mainDiv: {
    backgroundColor: '#0f0524',
    textAlign: 'center',
    color: 'white',
    border: 'none',
    justifyContent: 'center',
  },
  signup: {
    color: 'white',
    border: 'none',
    marginRight: '30%'
  },
  buttonDiv: {
    justifyContent: 'center',
  },
  deckDiv: {
    backgroundColor:' #0f0524',
    justifyContent: 'center',
    alignContent: 'center',
    outline: 'none',
    border: 'none',
    overflowWrap: 'normal',
    marginLeft:'7%'
  }
}

export default Search;
