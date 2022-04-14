"use strict";
const axios = require('axios')

module.exports.queryPopularFilms = async function queryPopularFilms(apiKey, start) {

  var url = "https://api.betaseries.com/movies/discover?key=" + apiKey + "&type=popular&offset=" + start + "&limit=20";
  var listOfMovies = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data).movies;
  // console.log(listOfMovies);
  return listOfMovies;
}

module.exports.update = function updateListOfFilms(apiKey, start) {
  this.queryPopularFilms(apiKey, start);
  start += 100;
  return listOfMovies, start;
}

