'use strict'

module.exports = async () => {
  return {
    // widgets
    widgets: {
      // root
      main: require('./widgets/main'),
      app: require('./widgets/app'),
      // pages/uis
      home: require('./widgets/pages/home'),
      userInterestsUi: require('./widgets/pages/userInterestsUi'),
      userViewedUi: require('./widgets/pages/userInterestsUi'),
      videoInfoUi: require('./widgets/pages/videoInfoUi'),
      // components
      // menu
      menu: require('./widgets/components/menu'),
      menuButton: require('./widgets/components/menuButton'),
      dropMenuAll: require('./widgets/components/dropMenuAll'),
      dropMenuButton: require('./widgets/components/dropMenuButton'),
      // home
      bottomButton: require('./widgets/components/bottomButton'),
      homeVideoInfo: require('./widgets/components/homeVideoInfo'),
      homeVideoInfoButton: require('./widgets/components/homeVideoInfoButton'),
      overlayForTvShows: require('./widgets/components/overlayForTvShows'),
      // videoInfo
      homeBottomButtons: require('./widgets/components/homeBottomButtons'),
      videoActorGrid: require('./widgets/components/videoActorGrid'),
      // interests
      // viewed
      movieSearchTextField: require('./widgets/components/movieSearchTextField'),
      // listMovieButton: require('./widgets/components/listMovieButton'),
      listOfVideo: require('./widgets/components/listOfVideo'),
    },
    // listeners: require('./listeners/all.js'),
    listeners: {
      onEnvStart: require('./listeners/appInit/onEnvStart'),
      onUserFirstJoin: require('./listeners/appInit/onUserFirstJoin'),
      onSessionStart: require('./listeners/appInit/onSessionStart'),
      onSessionStop: require('./listeners/appInit/onSessionStop'),

      bottomButtonClick: require('./listeners/event/bottomButtonClick'),
      switchMovieInfoUi: require('./listeners/event/videoInfoButtonClick'),
      goToHomeUi: require('./listeners/event/homeUiClick'),
      goToInterestUi: require('./listeners/event/interestUiClick'),
      goToViewedUi: require('./listeners/event/vieweduiClick'),
      changeMenuLabel: require('./listeners/event/changeMenuLabel'),
    },
    rootWidget: 'main'
  }
}