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
    },
    listeners: {
      InitData: require('./listeners/initData'),
      Viewed: require('./listeners/viewedButton'),
      Interested: require('./listeners/userInterestButton'),
      NotViewed: require('./listeners/notViewedButton'),
      switchHomeUi: require('./listeners/homeUiButton'),
      switchInterestUi: require('./listeners/userInterestUiButton'),
      switchViewedUi: require('./listeners/userViewedUiButton'),
      switchMovieInfoUi: require('./listeners/movieInfoUiButton'),
      bottomButtonHoverEvent:require('./listeners/bottomButtonHoverEvent'),
      menuButtonHoverEvent:require('./listeners/menuButtonHoverEvent'),
      // resetTextfield: require('./listeners/resetTextfield')
    },
    // resources:{
    //   appState: require('./resources/appState.json')
    // },
    rootWidget: 'app'
  }
}
