"use strict";
const axios = require('axios')

module.exports.queryPopularMovies = async function queryPopularMovies(apiKey, start) {
  var url = "https://api.betaseries.com/movies/discover?key=" + apiKey + "&type=popular&offset=" + start + "&limit=20";
  var listOfMovies = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data).movies;
  return listOfMovies;
}

module.exports.getMovieDetails = async function getMovieDetails(apiKey, id) {
  // https://api.betaseries.com/movies/movie
  var url = "https://api.betaseries.com/movies/movie?key=" + apiKey + "&id=" + id;
  var movieDetail = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data);
  return movieDetail;
}

module.exports.getCharacters = async function getCharacters(apiKey, id) {
  //https://api.betaseries.com/movies/characters?key=941cc48f228b&id=
  var url = "https://api.betaseries.com/movies/characters?key=" + apiKey + "&id=" + id;
  var movieCharacters = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data);
  return movieCharacters.characters;
}

module.exports.computeMovieDuration = function computeMovieDuration(movieLength) {
  var h = Math.floor(movieLength / 3600);
  var m = Math.floor(movieLength % 3600 / 60);
  var s = Math.floor(movieLength % 3600 % 60);

  if (h.toString().length < 2) {
    h = "0" + h;
  }
  if (s.toString().length < 2) {
    s = "0" + s;
  }
  if (m.toString().length < 2) {
    m = "0" + m;
  }
  return h + ":" + m + ":" + s;
}
module.exports.computeMenuTime = function computeMenuTime(totalSec) {
  var d = Math.floor(totalSec / (3600 * 24));
  var h = Math.floor(totalSec % (3600 * 24) / 3600);
  var m = Math.floor(totalSec % 3600 / 60);

  var dDisplay = d + "j ";
  var hDisplay = h + "h ";
  var mDisplay = m + "min ";
  return  totalSec == 0 ? "0j 0h 0min" : dDisplay + " " + hDisplay + " " + mDisplay ;
}

module.exports.getActorState = function getActorState(actorSt) {
  return actorSt;
}