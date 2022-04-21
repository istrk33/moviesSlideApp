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
      bottomButtonClick: require('./listeners/bottomButtonClick'),
      switchHomeUi: require('./listeners/homeUiButton'),
      switchInterestUi: require('./listeners/userInterestUiButton'),
      switchViewedUi: require('./listeners/userViewedUiButton'),
      switchMovieInfoUi: require('./listeners/movieInfoUiButton'),
      bottomButtonHoverEvent: require('./listeners/bottomButtonHoverEvent'),
      menuButtonHoverEvent: require('./listeners/menuButtonHoverEvent'),
      movieInfoButtonHoverEvent: require('./listeners/movieInfoButtonHoverEvent'),
      changeMenuLabel: require('./listeners/dropdownClick'),
      dropdownButtonHoverEvent: require('./listeners/dropdownButtonHoverEvent'),
      movieButtonHovered: require('./listeners/movieListItemHoverEvent'),
      deleteViewedMovie: require('./listeners/deleteViewedClickEvent'),
      // actorButtonClick: require('./listeners/actorButtonPressedEvent'),
    },
    // resources:{
    //   functions: require('./resources/functions')
    // },
    rootWidget: 'app'
  }
}
