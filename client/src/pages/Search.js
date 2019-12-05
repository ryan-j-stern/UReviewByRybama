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
        <img src={logo} width = "400"/>
        <br></br> SEARCH:
        <div className="search">
              <input type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} />
              {resultList}
          </div>

          <div class="row">
            <div class="col-sm-4">
            <br></br> column hi
            <p><a href="/watchlist">WATCHLIST</a></p>
            </div>
            <div class="col-sm-4">
            <br></br> column 2 </div>
            <div class="col-sm-4">
            <br></br> column 3 </div>
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
