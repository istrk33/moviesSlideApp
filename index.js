'use strict'

/**
 * Widgets
 * @returns 
 */
module.exports = () => {
  return {
    widgets: {
      // main
      app: require('./widgets/app'),
      main: require('./widgets/main'),

      // uis
      home: require('./widgets/ui/homeUi'),
      userInterest: require('./widgets/ui/userInterestUi'),
      userViewed: require('./widgets/ui/userViewedUi'),
      movieInfo: require('./widgets/ui/videoInfoUi'),

      // widgets
      homeWithOverlay: require('./widgets/components/overlayForTvShows'),
      menu: require('./widgets/components/menu'),
      charactersGrid: require('./widgets/components/videoInfoGrid'),
      bottomButton: require('./widgets/components/bottomButton'),
      menuButton: require('./widgets/components/menuButton'),
      movieButton: require('./widgets/components/movieButton'),
      dropdownMenuButton: require('./widgets/components/dropMenuButton'),
      listButton: require('./widgets/components/listsButton'),
      textfield: require('./widgets/components/searchTextField'),
      viewedListWidget: require('./widgets/components/widgetOfViewedList'),
      interestListWidget: require('./widgets/components/widgetOfInterestsList'),
      firstUi: require('./widgets/ui/first'),
    },
    listeners: {
      // init
      onEnvStart: require('./listeners/appInit/onEnvStart'),
      onSessionStart: require('./listeners/appInit/onSessionStart'),
      onUserFirstJoin: require('./listeners/appInit/onUserFirstJoin'),

      // clicks
      bottomButtonClick: require('./listeners/clicks/bottomButtonClick'),
      switchHomeUi: require('./listeners/clicks/homeUiClick'),
      switchInterestUi: require('./listeners/clicks/interestUiClick'),
      switchViewedUi: require('./listeners/clicks/viewedUiClick'),
      switchMovieInfoUi: require('./listeners/clicks/videoInfoUiClick'),
      deleteViewedMovie: require('./listeners/clicks/deleteViewedClick'),
      changeMenuLabel: require('./listeners/clicks/dropdownClick'),
      viewedMovieButton: require('./listeners/clicks/movieInterestToViewedClick'),
      showOverlaySeason: require('./listeners/clicks/viewedTvShowClick'),
      addTvShowSeason: require('./listeners/clicks/confirmTvShowSeasonClick'),
      hideOverlay: require('./listeners/clicks/hideOverlayClick'),
      
      // hovers
      bottomButtonHoverEvent: require('./listeners/hovers/bottomButtonHover'),
      menuButtonHoverEvent: require('./listeners/hovers/menuButtonHover'),
      movieInfoButtonHoverEvent: require('./listeners/hovers/videoInfoButtonHover'),
      dropdownButtonHoverEvent: require('./listeners/hovers/dropdownButtonHover'),
      movieButtonHovered: require('./listeners/hovers/movieListItemHover'),
      
      //slider
      sliderValueChanged: require('./listeners/slider/numberOfSeasonChanged'),
      
      //textfield
      searchTextChanged: require('./listeners/textFields/searchTextChanged'),
      
      loadAll: require('./listeners/clicks/loadAll'),
    },
    rootWidget: 'main'
  }
}
