'use strict'

module.exports = async (data, props, event) => {
  var functions = require("../resources/functions");
  const bottomButtonsColors = [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]];
  const white = 0xFFFFFFFF;
  const black = 0xFF000000;
  const apiKey = "941cc48f228b";
  const hoverMenuButtonColor = 0xFFB5B5B5;
  var userInterests = {};
  var userViewed = {};
  var userNotViewed = {};
  var listOfUndiscoveredFilms = {};
  // const menuButtonColor=0xFF494949;
  var menuHoverButton1Color = [black, white];
  var menuHoverButton2Color = [black, white];
  var movieInfoButtonColor = [0xF4212121, 0xFFFFFFFF];
  var bottomButton1Color = [bottomButtonsColors[0][0], white];
  var bottomButton2Color = [bottomButtonsColors[1][0], white];
  var bottomButton3Color = [bottomButtonsColors[2][0], white];
  var start = 0;
  (await functions.queryPopularFilms(apiKey, start)).forEach((element) => listOfUndiscoveredFilms[element.id] = [element.id,element.title, element.production_year]);
  start += 100;
  // console.log(listOfUndiscoveredFilms);
  var currentMovie=listOfUndiscoveredFilms[Object.keys(listOfUndiscoveredFilms)[0]];
  console.log(currentMovie);
  if (typeof totalDurationTime !== 'undefined' && userInterests.length != 0 && userViewed.length != 0 && userNotViewed.length != 0) {
    return
    data
  } else {
    return {
      navigation: "home",
      totalDurationTime: 0,
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
      listOfUndiscoveredFilms,
      userInterests,
      userViewed,
      userNotViewed
    }
  }
}