'use strict'

// Widgets
module.exports = () => {
  return {
    widgets: {
      // main
      app: require('./widgets/app'),
      menu: require('./widgets/components/menu'),

      // uis
      home: require('./widgets/ui/homeUi'),
      homeWithOverlay: require('./widgets/ui/homeUiWithOverlay'),
      userInterest: require('./widgets/ui/userInterestUi'),
      userViewed: require('./widgets/ui/userViewedUi'),
      movieInfo: require('./widgets/ui/videoInfoUi'),

      // buttons
      bottomButton: require('./widgets/components/bottomButton'),
      menuButton: require('./widgets/components/menuButton'),
      movieButton: require('./widgets/components/movieButton'),
      dropdownMenuButton: require('./widgets/components/dropMenuButton'),
    },
    listeners: {
      // init
      InitData: require('./listeners/initData'),

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
    },
    rootWidget: 'app'
  }
}
