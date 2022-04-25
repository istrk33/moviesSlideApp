'use strict'

/**
 * managing actionable colors
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    data.menuHoverButton1Color=[data.black,data.white];
    data.menuHoverButton2Color=[data.black,data.white];
    data.navigation="home";
    return data
}