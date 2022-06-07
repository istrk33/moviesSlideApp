const LenraData = require('./LenraData.js');

module.exports = class User extends LenraData {
    /**
     * 
     * @param {*} _id 
     * @param {*} _datastore 
     * @param {*} _refs 
     * @param {*} _refBy 
     * @param {*} navigation 
     * @param {*} totalWastedTime 
     * @param {*} totalSavedTime 
     * @param {*} potentialWasteTime 
     * @param {*} menuTimeLabel 
     * @param {*} searchValue 
     * @param {*} tvShowIdToSetupSeasons 
     * @param {*} currentTvShowViewedSeasons 
     * @param {*} overlaySliderValue 
     * @param {*} start 
     * @param {*} overlayState 
     * @param {*} currentMovieInfo 
     * @param {*} movieInfoToSee 
     * @param {*} currentId 
     */
    constructor(_id, _datastore, _refs, _refBy, navigation, totalWastedTime, totalSavedTime, potentialWasteTime, menuTimeLabel, searchValue, tvShowIdToSetupSeasons, currentTvShowViewedSeasons, overlaySliderValue, start, overlayState, currentMovieInfo, movieInfoToSee, currentId) {
        super(_id, _datastore, _refs, _refBy);
        this.navigation = navigation;
        this.totalWastedTime = totalWastedTime;
        this.totalSavedTime = totalSavedTime;
        this.potentialWasteTime = potentialWasteTime;
        this.menuTimeLabel = menuTimeLabel;
        this.searchValue = searchValue;
        this.tvShowIdToSetupSeasons = tvShowIdToSetupSeasons;
        this.currentTvShowViewedSeasons = currentTvShowViewedSeasons;
        this.overlaySliderValue = overlaySliderValue;
        this.start = start;
        this.overlayState = overlayState;
        this.currentMovieInfo = currentMovieInfo;
        this.movieInfoToSee = movieInfoToSee;
        this.currentId = currentId;
    }
}