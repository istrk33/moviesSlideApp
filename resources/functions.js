"use strict";
const axios = require('axios')

/**
 * requesting popular movies from an api
 * @param {key to get value from the } apiKey 
 * @param {the starting point} start 
 * @returns a list of json for each movies
 */
module.exports.queryPopularMovies = async function queryPopularMovies(apiKey, start) {
  var url = "https://api.betaseries.com/movies/discover?key=" + apiKey + "&type=popular&offset=" + start + "&limit=5";
  var listOfMovies = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data).movies;
  return listOfMovies;
}

/**
 * requesting popular tvshows from the api
 * @param {api key} apiKey 
 * @param {the starting point} start 
 * @returns a list of json for each tvshows
 */
module.exports.queryPopularTvShows = async function queryPopularTvShows(apiKey, start) {
  // var url = "https://api.betaseries.com/shows/list?key=" + apiKey + "&order=popularity&start=" + start + "&limit=5";
  var url = "https://api.betaseries.com/shows/list?key=" + apiKey + "&order=followers&start=" + start + "&limit=5";
  var listOfTvShows = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data).shows;
  return listOfTvShows;
}

/**
 * requesting movie details for the current movie or the movie info ui
 * @param {api key} apiKey 
 * @param {movie id} id 
 * @returns 
 */
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

/**
 * requesting tv show details for the current movie or the movie info ui
 * @param {api key} apiKey 
 * @param {tv show id} id 
 * @returns 
 */
module.exports.getTvShowDetails = async function getTvShowDetails(apiKey, id) {
  // https://api.betaseries.com/shows/display?key=941cc48f228b&id=22592
  var url = "https://api.betaseries.com/shows/display?key=" + apiKey + "&id=" + id;
  var tvShowDetail = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data);
  return tvShowDetail;
}

/**
 * requesting movie characters for the movie info ui
 * @param {api key} apiKey 
 * @param {movie id} id 
 * @returns 
 */
module.exports.getCharacters = async function getCharacters(apiKey, id) {
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

/**
 * requesting tv shows characters for the movie info ui
 * @param {api key} apiKey 
 * @param {id of the tv show} id 
 * @returns 
 */
module.exports.getTvShowsCharacters = async function getTvShowsCharacters(apiKey, id) {
  var url = "https://api.betaseries.com/shows/characters?key=" + apiKey + "&id=" + id;
  var tvShowsCharacters = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  )).data);
  return tvShowsCharacters.characters;
}

/**
 * converting an amount of second to "hh:mm:ss" format
 * @param {number of seconds} movieLength 
 * @returns seconds to "hh:mm:ss"
 */
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

/**
 * converting an amount of second to "ddJ hhH mmM" format
 * @param {number of seconds} totalSec 
 * @returns seconds to "ddJ hhH mmM"
 */
module.exports.computeMenuTime = function computeMenuTime(totalSec) {
  var d = Math.floor(totalSec / (3600 * 24));
  var h = Math.floor(totalSec % (3600 * 24) / 3600);
  var m = Math.floor(totalSec % 3600 / 60);

  var dDisplay = d + "j ";
  var hDisplay = h + "h ";
  var mDisplay = m + "min ";
  return totalSec == 0 ? "0j 0h 0min" : dDisplay + " " + hDisplay + " " + mDisplay;
}

