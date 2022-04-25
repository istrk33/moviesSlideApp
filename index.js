'use strict'

// Widgets

module.exports = () => {
  return {
    widgets: {
      app: require('./widgets/app'),
      menu: require('./widgets/components/menu'),
      bottomButton: require('./widgets/components/bottomButton'),
      menuButton: require('./widgets/components/menuButton'),
      home: require('./widgets/ui/homeUi'),
      userInterest: require('./widgets/ui/userInterestUi'),
      userViewed: require('./widgets/ui/userViewedUi'),
      movieInfo: require('./widgets/ui/movieInfoUi'),
      movieButton: require('./widgets/components/movieButton'),
      dropdownMenuButton: require('./widgets/components/dropMenuButton'),
    },
    listeners: {
      InitData: require('./listeners/initData'),
      bottomButtonClick: require('./listeners/clicks/bottomButtonClick'),
      switchHomeUi: require('./listeners/clicks/homeUiButton'),
      switchInterestUi: require('./listeners/clicks/userInterestUiButton'),
      switchViewedUi: require('./listeners/clicks/userViewedUiButton'),
      switchMovieInfoUi: require('./listeners/clicks/movieInfoUiButton'),
      deleteViewedMovie: require('./listeners/clicks/deleteViewedClickEvent'),
      changeMenuLabel: require('./listeners/clicks/dropdownClick'),
      viewedMovieButton: require('./listeners/clicks/addInterestToViewedEvent'),
      bottomButtonHoverEvent: require('./listeners/hovers/bottomButtonHoverEvent'),
      menuButtonHoverEvent: require('./listeners/hovers/menuButtonHoverEvent'),
      movieInfoButtonHoverEvent: require('./listeners/hovers/movieInfoButtonHoverEvent'),
      dropdownButtonHoverEvent: require('./listeners/hovers/dropdownButtonHoverEvent'),
      movieButtonHovered: require('./listeners/hovers/movieListItemHoverEvent'),
    },
    rootWidget: 'app'
  }
}
