import React, { Component } from 'react';
import logo from './images/UReviewLogo.png';
import './Search.css';
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'

console.log(logo);

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
      this.postAndFetchData('/movie/search', 1)
    }
   
    // Sets variable to false when ready to leave page
     componentWillUnmount = () => {
      this.mounted = false
    }

    // Will set a variable to true when component is fully mounted
     componentDidMount = () => {
      this.mounted = true
    }

    render(){
      // Sets query in state to be whatever the user is typing
    
    return (
      <div style={styling.mainDiv} >
      <NavBar location={{state: {jwt: this.state.jwt}}}/>

        <img src= {logo} width = "400"/>
        <br></br> SEARCH:
        <div className="search">
        {this.renderRedirect()}
              <input type="input" name="query" value={this.state.query} onChange={this.handleQueryChange} />
              
              <Button variant="outline-success" onClick={this.onSubmit}>Submit</Button>
        </div>

          <div class="row">
            <div class="col-sm-4">
            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            </div>
            <div class="col-sm-4">
            <br></br>

            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            </div>
            <div class="col-sm-4">
            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            <br></br>
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>

            </div>
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

export default Search;
