'use strict'

/**
 * 
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    data.menuHoverButton1Color=[data.black,data.white];
    data.menuHoverButton2Color=[data.black,data.white];
    data.menuTimeLabel = "tempsAPerdre";
    data.navigation="userInterest";
    return data
}