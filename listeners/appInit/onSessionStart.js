'use strict'

const service = require("../../services/userDataService");
const functions = require("../../resources/functions");

module.exports = async(props, event, api) => {
    // const bottomButtonsColors = [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]];
    // const dropDownDefaultButtonColor = 0xFF1E232C;
    // const white = 0xFFFFFFFF;
    // const black = 0xFF000000;
    // const apiKey = "941cc48f228b";
    // // var list = [];

    // var listOfUndiscoveredMovies = {};
    // var userInterests = {};
    // var userViewed = {};
    // var userNotViewed = {};
    // var movieInfoToSee = null;
    // var start = 0;
    // (await functions.queryPopularMovies(apiKey, start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
    // (await functions.queryPopularTvShows(apiKey, start)).forEach((element) => listOfUndiscoveredMovies["tvshows_" + element.id] = [element.id, element.title]);
    // start += 5;

    // // getting random id from the dictionnary and let it current movie/tvshow
    // var keys = Object.keys(listOfUndiscoveredMovies);
    // var currentId = keys[keys.length * Math.random() << 0];
    // var currentMovie = listOfUndiscoveredMovies[currentId];
    // var currentMovieInfo = (currentId.includes("tvshows_")) ? (await functions.getTvShowDetails(apiKey, currentMovie[0])) : (await functions.getMovieDetails(apiKey, currentMovie[0]));

    // //adding data into general data datastore
    // var dict = {
    //     apiKey: "941cc48f228b",
    //     navigation: "home",
    //     bottomButtonsColors: bottomButtonsColors,
    //     dropDownDefaultButtonColor: dropDownDefaultButtonColor,
    //     white: white,
    //     black: black,
    //     menuHoverButton1Color: [black, white],
    //     menuHoverButton2Color: [black, white],
    //     bottomButton1Color: [bottomButtonsColors[0][0], white],
    //     bottomButton2Color: [bottomButtonsColors[1][0], white],
    //     bottomButton3Color: [bottomButtonsColors[2][0], white],
    //     dropDownButton1Color: [dropDownDefaultButtonColor, white],
    //     dropDownButton2Color: [dropDownDefaultButtonColor, white],
    //     dropDownButton3Color: [dropDownDefaultButtonColor, white],
    //     hoverMenuButtonColor: 0xFFB5B5B5,
    //     darkbg: 0xFF212121,
    //     movieInfoButtonColor: [0xF4212121, white],
    //     totalWastedTime: 0,
    //     totalSavedTime: 0,
    //     potentialWasteTime: 0,
    //     menuTimeLabel: "tempsPerdu",
    //     searchValue: "",
    //     tvShowIdToSetupSeasons: -1,
    //     currentTvShowViewedSeasons: 1,
    //     overlaySliderValue: 1,
    //     start,
    //     overlayState: false,
    //     currentMovieInfo,
    //     movieInfoToSee,
    //     keys,
    //     currentId,
    //     listOfUndiscoveredMovies,
    //     userInterests,
    //     userNotViewed,
    //     userViewed
    // }
    // return service.new(api, dict).then(function (response) {
    //     response.data
    // });
}