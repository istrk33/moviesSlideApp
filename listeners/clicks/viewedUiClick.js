'use strict'

/**
 * redirecting to the view viewed videos
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    data.menuHoverButton1Color=[data.black,data.white];
    data.menuHoverButton2Color=[data.black,data.white];
    data.navigation="userViewed";
    data.menuTimeLabel = "tempsPerdu";
    data.searchValue="";
    return data
}