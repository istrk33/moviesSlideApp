'use strict'

/**
 * updating current movie/tvshow and the dictionnary of movies/tvshows
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async (data, _props, event) => {
    const functions = require("../../resources/functions");
    var videoId = data.currentId;
    // checking if it's a movie or a tv show
    if (_props.videoType == "movie") {
        switch (_props.buttonName) {
            case "viewed":
                data.userViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.userViewed[videoId].push(data.darkbg);
                data.userViewed[videoId].push(data.currentMovieInfo.movie.length);
                data.totalWastedTime += data.currentMovieInfo.movie.length;
                break;
            case "notviewed":
                data.userNotViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.totalSavedTime += data.currentMovieInfo.movie.length;
                break;
            case "interested":
                data.userInterests[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.userInterests[videoId].push(data.darkbg);
                data.userInterests[videoId].push(data.currentMovieInfo.movie.length);
                data.potentialWasteTime += data.currentMovieInfo.movie.length;
                break;
        }
    } else {
        var timeInSec = 0;
        data.currentMovieInfo.show.seasons_details.forEach(element => {
            timeInSec += element.episodes * data.currentMovieInfo.show.length * 60;
        });
        switch (_props.buttonName) {
            case "viewed":
                // data.userViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
                // data.userViewed[videoId].push(data.darkbg);
                // data.userViewed[videoId].push(data.currentMovieInfo.movie.length);
                // data.totalWastedTime += data.currentMovieInfo.movie.length;
                // afficher l'overlay l'overlay avec toute les saisons
                // faire attention dans la liste des intérets, lorsque que l'on marque une série en vue faire aussi afficher l'overlay pour choisir les saisons
                //
                break;
            case "notviewed":
                data.userNotViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.totalSavedTime += timeInSec;
                break;
            case "interested":
                data.userInterests[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.userInterests[videoId].push(data.darkbg);
                data.userInterests[videoId].push(timeInSec);
                data.potentialWasteTime += timeInSec;
                break;
        }

    }
    delete data.listOfUndiscoveredMovies[videoId];
    data.keys = Object.keys(data.listOfUndiscoveredMovies);
    data.currentId= data.keys[ data.keys.length * Math.random() << 0];
    var currentMovie = data.listOfUndiscoveredMovies[data.currentId][0];
    data.currentMovieInfo = (data.currentId.includes("tvshows_")) ? (await functions.getTvShowDetails(data.apiKey, currentMovie)) : (await functions.getMovieDetails(data.apiKey, currentMovie));
    if (data.keys.length <= 1) {
        (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
        (await functions.queryPopularTvShows(data.apiKey, data.start)).forEach((element) =>data.listOfUndiscoveredMovies["tvshows_"+element.id] = [element.id, element.title] );
        data.start += 5;
    }
    return data
}