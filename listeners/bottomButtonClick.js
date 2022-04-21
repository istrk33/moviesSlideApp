'use strict'

module.exports = async (data, _props, event) => {
    const functions = require("../resources/functions");
    switch (_props.buttonName) {
        case "viewed":
            data.userViewed[_props.movieDict[0]] = _props.movieDict;
            data.userViewed[_props.movieDict[0]].push(data.darkbg);
            data.totalWastedTime += data.currentMovieInfo.movie.length;
            break;
        case "notviewed":
            data.userNotViewed[_props.movieDict[0]] = _props.movieDict;
            data.totalSavedTime += data.currentMovieInfo.movie.length;
            break;
        case "interested":
            data.userInterests[_props.movieDict[0]] = _props.movieDict;
            data.userInterests[_props.movieDict[0]].push(data.darkbg);
            data.potentialWasteTime += data.currentMovieInfo.movie.length;
            break;
    }
    delete data.listOfUndiscoveredMovies[Object.keys(data.listOfUndiscoveredMovies)[0]];
    data.currentMovie = data.listOfUndiscoveredMovies[Object.keys(data.listOfUndiscoveredMovies)[0]];
    data.currentMovieInfo = (await functions.getMovieDetails(data.apiKey, data.currentMovie[0]));
    if (Object.keys(data.listOfUndiscoveredMovies).length <= 3) {
        (await functions.queryPopularMovies(data.apiKey, data.start)).forEach((element) => data.listOfUndiscoveredMovies[element.id] = [element.id, element.title, element.production_year]);
        data.start += 20;
    }
    return data
}