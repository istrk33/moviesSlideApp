"use strict";
const axios = require('axios')
const service = require("../services/userDataService");
const functions = require("../resources/functions");
/**
 * requesting popular movies from an api
 * @param {key to get value from the } apiKey 
 * @param {the starting point} start 
 * @returns a list of json for each movies
 */
module.exports.queryPopularMovies = async function queryPopularMovies(apiKey, start) {
  var url = "https://api.betaseries.com/movies/discover?key=" + apiKey + "&type=popular&offset=" + start + "&limit=5";
  var listOfMovies = (((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  ).catch((e => {
    console.log(e);
  }))).data).movies);
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
  console.log("QUERY POPULAR MOVIIIIIIIIIIIIIIIIIIIIIIIIIIIIIE");
  console.log(url);
  var listOfTvShows = (((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  ).catch((e => {
    console.log(e);
  }))).data).shows);
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
  console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 1111111");
  var url = "https://api.betaseries.com/movies/movie?key=" + apiKey + "&id=" + id;
  console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 22222222");
  console.log(url);
  var movieDetail = (await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
    ).catch((e => {
      console.log("EEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      console.log(e);
    }))).data;
    console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 3333333");
  console.log(movieDetail);
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
  console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 1111111");
  var url = "https://api.betaseries.com/shows/display?key=" + apiKey + "&id=" + id;
  console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 2222222");
  var tvShowDetail = ((await axios.get(url, { crossdomain: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  ).catch((e => {
    console.log(e);
  }))));
  console.log("DETAILS TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 3333333");
  console.log(tvShowDetail.data);
  return tvShowDetail.data;
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
  ).catch((e => {
    console.log("ERROR " + e);
  }))).data);
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
  ).catch((e => {
    console.log("ERROR " + e);
  }))).data)
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

/**
 * getting stars strings from the average note of the video
 * @param {the object that contains the data} video 
 * @returns array of strings
 */
module.exports.getStars = function getStars(video) {
  var numberOfStar = parseInt(video.notes.mean);
  var arr = Array(numberOfStar).fill("star");
  (video.notes.mean % 1 != 0) ? arr.splice(arr.length, 0, "star_half") : "";
  while (arr.length < 5) {
    arr.splice(arr.length, 0, "star_border_outlined");
  }
  return arr;
}

/**
 * update current video and checking if the main dict containing tvshows/movies is not empty
 * @param {the main data of the app} data
 * @param {id of the video to erase from the main list} videoId
 * @returns data
 */
module.exports.updateCurrent = async function updateCurrent(data, api) {
  var listOfUndiscoveredMoviesFromApi = (await service.getDatastore(api, "listOfUndiscoveredMovies"));
  var listLength = listOfUndiscoveredMoviesFromApi.data.data.length;
  data.currentId = listOfUndiscoveredMoviesFromApi.data.data[0].data[0];
  data.currentMovieInfo = (String(data.currentId).includes("tvshows_")) ? (await functions.getTvShowDetails(data.apiKey, String(data.currentId).substring(8))) : (await functions.getMovieDetails(data.apiKey, data.currentId));
  if (listLength <= 2) {
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT UPDATE 111111111111111111111111111111111111111111111111");
    var listOfUndiscoveredMovies = {};
    (await module.exports.queryPopularMovies(data.apiKey, data.start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
    (await module.exports.queryPopularTvShows(data.apiKey, data.start)).forEach((element) => listOfUndiscoveredMovies["tvshows_" + element.id] = ["tvshows_" + element.id, element.title]);
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT UPDATE 222222222222222222222222222222222222222222222222222");
    var mixedArray = Object.values(listOfUndiscoveredMovies).sort((a, b) => 0.5 - Math.random());
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT UPDATE 3333333333333333333333333333333333333333333333333333");
    await Promise.all(mixedArray.map((element) => {
      return service.new(api, "listOfUndiscoveredMovies", [element[0], element[1]]).then(function (response) {
        response.data;
      }).catch((e => {
        list.push(e);
        console.log(e);
      }));
    }
    ));
    console.log("TESSSSSSSSSSSSSSSSSSTTTTTTTTT UPDATE 44444444444444444444444444444444444444444444444444");
    data.start += 5;
  }
  return data;
}

