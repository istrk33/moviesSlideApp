'use strict'

/**
 * managing colors of bottom actionable when user hovered them
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (_props, event, api) => {
    switch (_props.buttonStr) {
        case "Vu":
            changeButtonColorState(data.bottomButton1Color, data.bottomButtonsColors[0][0], data.bottomButtonsColors[0][1], data);
            break;
        case "Intéressé":
            changeButtonColorState(data.bottomButton2Color, data.bottomButtonsColors[1][0], data.bottomButtonsColors[1][1], data);
            break;
        case "Pas vu":
            changeButtonColorState(data.bottomButton3Color, data.bottomButtonsColors[2][0], data.bottomButtonsColors[2][1], data);
            break;
    }
    return data
}

/**
 * changing the color values of the array
 * @param {array with 2 color values one for background and the other for the text value} button 
 * @param {default color 1} color1 
 * @param {default color 2} color2 
 * @param {main data} data 
 */
function changeButtonColorState(button, color1, color2, data) {
    if (button[0] == color1) {
        button[0] = color2;
        button[1] = data.black;
    } else {
        button[0] = color1;
        button[1] = data.white;
    }
}