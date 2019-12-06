import React from 'react';
import logo from './images/UReviewLogo.png';
import './Search.css';


console.log(logo);

const Search = (props) => {
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <li key={item.imdbID} onClick={() => props.clicked(item)}>
                        <img src={item.Poster} alt="Movie Poster"/>
                        {item.Title}
                    </li>
                ))}
            </ul>
        )
    }

    return (
      <div style={styling.mainDiv} >

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">UReview</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
        </li>
        </ul>
        </div>
      </nav>

        <img src= {logo} width = "400"/>
        <br></br> SEARCH:
        <div className="search">
              <input type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} />
              {resultList}
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
