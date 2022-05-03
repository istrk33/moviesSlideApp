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
    return data
}