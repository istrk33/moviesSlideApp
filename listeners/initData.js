'use strict'

module.exports = async (data, props, event) => {
  //quelques constantes
  const functions = require("../resources/functions");
  const bottomButtonsColors = [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]];
  const dropDownDefaultButtonColor = 0xFF1E232C;
  const white = 0xFFFFFFFF;
  const black = 0xFF000000;
  const apiKey = "941cc48f228b";
  var userInterests = {};
  var userViewed = {};
  var userNotViewed = {};
  var listOfUndiscoveredMovies = {};

  //ajout des films dans le dictionnaire
  var movieInfoToSee;
  var start = 0;
  // (await functions.queryPopularTvShows(apiKey, start)).forEach((element) =>listOfUndiscoveredMovies["tvshows_"+element.id] = [element.id, element.title, element.creation,element.seasons_details,element.length,element.showrunner.name] );
  (await functions.queryPopularMovies(apiKey, start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title, element.production_year]);
  start += 2;
  //ajout des séries
  // var startShow = 0;
  // (await functions.queryPopularTvShows(apiKey, startShow)).forEach((element) =>listOfUndiscoveredMovies["tvshows_"+element.id] = [element.id, element.title, element.creation,element.seasons_details,element.length] );

  //stockage du film courant
  var currentMovie = listOfUndiscoveredMovies[Object.keys(listOfUndiscoveredMovies)[0]];
  var currentMovieInfo = (Object.keys(listOfUndiscoveredMovies)[0].includes("tvshows_"))?(await functions.getTvShowDetails(apiKey, currentMovie[0])):(await functions.getMovieDetails(apiKey, currentMovie[0]));
  // console.log(currentMovieInfo);

  if (typeof totalDurationTime !== 'undefined' && userInterests.length != 0 && userViewed.length != 0 && userNotViewed.length != 0) {
    return
    data
  } else {
    return {
      navigation: "home",
      menuHoverButton1Color: [black, white],
      menuHoverButton2Color: [black, white],
      bottomButton1Color: [bottomButtonsColors[0][0], white],
      bottomButton2Color: [bottomButtonsColors[1][0], white],
      bottomButton3Color: [bottomButtonsColors[2][0], white],
      dropDownButton1Color: [dropDownDefaultButtonColor, white],
      dropDownButton2Color: [dropDownDefaultButtonColor, white],
      dropDownButton3Color: [dropDownDefaultButtonColor, white],
      hoverMenuButtonColor: 0xFFB5B5B5,
      darkbg:0xFF212121,
      movieInfoButtonColor: [0xF4212121, white],
      dropDownDefaultButtonColor,
      white,
      black,
      apiKey,
      bottomButtonsColors,
      totalWastedTime: 0,
      totalSavedTime: 0,
      potentialWasteTime: 0,
      menuTimeLabel: "tempsPerdu",
      // currentMovie,
      listOfUndiscoveredMovies,
      userInterests,
      userViewed,
      userNotViewed,
      start,
      currentMovieInfo,
      movieInfoToSee
    }
  }
}