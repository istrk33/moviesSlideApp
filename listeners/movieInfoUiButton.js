'use strict'

module.exports = async(data, _props, event) => {
    const functions = require("../resources/functions");
    data.navigation = "movieInfo";
    if (_props.from == "home") {
        data.movieInfoToSee = data.currentMovieInfo;
    } else {
        if(_props.type=="movie"){
            data.movieInfoToSee = (await functions.getMovieDetails(data.apiKey, _props.movieId));
            console.log("IDDDDDDDDDDDDDDDDDD "+props.movieId);
        }else{
            data.movieInfoToSee = (await functions.getMovieDetails(data.apiKey, _props.movieId));
        }
    }
    return data
}