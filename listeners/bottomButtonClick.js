'use strict'

module.exports = async (data, _props, event) => {
    const functions = require("../resources/functions");
    var videoId = Object.keys(data.listOfUndiscoveredMovies)[0];
     console.log(_props);
    if (_props.videoType == "movie") {
        console.log(data.userViewed);
        console.log("VIUDEO IDDDDDDDD"+videoId);
        console.log(data.userViewed[videoId]);
        switch (_props.buttonName) {
            case "viewed":
                data.userViewed[videoId] = data.listOfUndiscoveredMovies[videoId];
                data.userViewed[videoId].push(data.darkbg);
                data.userViewed[videoId].push(data.currentMovieInfo.movie.length);
                data.totalWastedTime += data.currentMovieInfo.movie.length;
                break;
            case "notviewed":
                data.userNotViewed[_props.movieDict[0]] = data.listOfUndiscoveredMovies[videoId];
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
        console.log("tesssssssssssssssssssssssst");
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
    }
    delete data.listOfUndiscoveredMovies[Object.keys(data.listOfUndiscoveredMovies)[0]];
    var currentMovie = data.listOfUndiscoveredMovies[Object.keys(data.listOfUndiscoveredMovies)[0]][0];
    data.currentMovieInfo = (Object.keys(data.listOfUndiscoveredMovies)[0].includes("tvshows_")) ? (await functions.getTvShowDetails(data.apiKey, currentMovie)) : (await functions.getMovieDetails(data.apiKey, currentMovie));
    if (Object.keys(data.listOfUndiscoveredMovies).length <= 3) {
        (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title, element.production_year]);
        data.start += 20;
        // var startShow = 0;
        // (await functions.queryPopularTvShows(apiKey, startShow)).forEach((element) =>listOfUndiscoveredMovies["tvshows_"+element.id] = [element.id, element.title, element.creation,element.seasons_details,element.length] );
    }
    return data
}