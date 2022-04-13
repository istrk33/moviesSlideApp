'use strict'

module.exports = (data, props, event) => {
  const bottomButtonsColors = [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFF3DFCD], [0xFFBD2828, 0xFFF1D9D9]];
  const white = 0xFFFFFFFF;
  const black = 0xFF000000;
  const hoverMenuButtonColor=0xFFB5B5B5;
  var menuHoverButton1Color=[black,white];
  var menuHoverButton2Color=[black,white];
  // var menuHoverButton3Color=defaultMenuButtonColor;
  var bottomButton1Color = [bottomButtonsColors[0][0], white];
  var bottomButton2Color = [bottomButtonsColors[1][0], white];
  var bottomButton3Color = [bottomButtonsColors[2][0], white];
  if (typeof totalDurationTime !== 'undefined' && userInterests.length != 0 && userViewed.length != 0) {
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
      userInterests: ["un", "deux", "trois", "quatre", "cinq"],
      userViewed: ["strange", "vbt", "nwh", "spectre", "notimetodie"]
    }
  }
}
