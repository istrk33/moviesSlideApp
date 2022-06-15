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
      menu: require('./widgets/components/menu'),
      menuButton: require('./widgets/components/menuButton'),
      bottomButton: require('./widgets/components/bottomButton'),
      homeVideoInfo: require('./widgets/components/homeVideoInfo'),
      listMovieButton: require('./widgets/components/listMovieButton'),
      movieSearchTextField: require('./widgets/components/movieSearchTextField'),
      videoActorGrid: require('./widgets/components/movieSearchTextField'),
      listOfVideo: require('./widgets/components/movieSearchTextField'),
      dropMenuButton: require('./widgets/components/movieSearchTextField'),
      overlayForTvShows: require('./widgets/components/movieSearchTextField'),
    },
    // listeners: require('./listeners/all.js'),
    listeners: {
      onEnvStart: require('./listeners/appInit/onEnvStart'),
      onUserFirstJoin: require('./listeners/appInit/onUserFirstJoin'),
      onSessionStart: require('./listeners/appInit/onSessionStart'),
    },
    rootWidget: 'main'
  }
}