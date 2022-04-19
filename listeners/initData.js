'use strict'

module.exports = async (data, props, event) => {
  const functions = require("../resources/functions");
  const bottomButtonsColors = [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]];
  const white = 0xFFFFFFFF;
  const black = 0xFF000000;
  const apiKey = "941cc48f228b";
  const hoverMenuButtonColor = 0xFFB5B5B5;
  var userInterests = {};
  var userViewed = {};
  var userNotViewed = {};
  var listOfUndiscoveredMovies = {};
  var menuHoverButton1Color = [black, white];
  var menuHoverButton2Color = [black, white];
  var movieInfoButtonColor = [0xF4212121, 0xFFFFFFFF];
  var bottomButton1Color = [bottomButtonsColors[0][0], white];
  var bottomButton2Color = [bottomButtonsColors[1][0], white];
  var bottomButton3Color = [bottomButtonsColors[2][0], white];
  var start = 0;
  var menuTimeLabel = "tempsPerdu";
  var movieInfoToSee;
  (await functions.queryPopularMovies(apiKey, start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title, element.production_year]);
  start += 20;
  var currentMovie = listOfUndiscoveredMovies[Object.keys(listOfUndiscoveredMovies)[0]];
  var currentMovieInfo=(await functions.getMovieDetails(apiKey, currentMovie[0]));
  if (typeof totalDurationTime !== 'undefined' && userInterests.length != 0 && userViewed.length != 0 && userNotViewed.length != 0) {
    return
    data
  } else {
    return {
      navigation: "home",
      totalWastedTime: 0,
      totalSavedTime: 0,
      potentialWasteTime: 0,
      bottomButtonsColors,
      hoverMenuButtonColor,
      bottomButton1Color,
      bottomButton2Color,
      bottomButton3Color,
      white,
      black,
      menuHoverButton1Color,
      menuHoverButton2Color,
      movieInfoButtonColor,
      currentMovie,
      listOfUndiscoveredMovies,
      userInterests,
      userViewed,
      userNotViewed,
      start,
      apiKey,
      currentMovieInfo,
      movieInfoToSee,
      menuTimeLabel
    }
  }
}