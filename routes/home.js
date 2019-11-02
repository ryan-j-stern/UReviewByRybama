const express = require('express')
const router = express()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.get('/', (req, res) => {
  function getCategoryList(callback) {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }
  
      if (xhr.status === 200) {
        console.log('SUCCESS', xhr.responseText);
        callback(JSON.parse(xhr.responseText));
      } else {
        console.warn('request_error');
      }
    };
  
    xhr.open('GET', "https://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US&api_key=" + process.env.APIKEY);
    xhr.send();
  }
  
  getCategoryList(data => {
    let topRatedArray = []
    for(let i = 0; i < data.results.length; i++) {
      topRatedArray[i] = {
        id: data.results[i].id,
        title: data.results[i].title,
        overview: data.results[i].overview,
        releaseDate: data.results[i].release_date
      }
    }
    res.json(topRatedArray)
  });
  
})


module.exports = router