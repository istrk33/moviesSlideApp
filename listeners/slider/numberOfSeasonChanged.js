'use strict'

/**
 * deleting a movie from the viewed dictionnary
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    console.log(event.value);
    console.log(data.overlaySliderValue);
    data.overlaySliderValue=event.value;
    //maj tab
    // if(data.tvShowIdToSetupSeasons!=-1){
    //     console.log(data.userViewed["tvshows_"+data.tvShowIdToSetupSeasons][4]);
    //     console.log(data.userViewed["tvshows_"+data.tvShowIdToSetupSeasons]);
    //     data.userViewed["tvshows_"+data.tvShowIdToSetupSeasons][4]=event.value;
    // }
    return data
}