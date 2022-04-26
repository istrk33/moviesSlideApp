'use strict'

/**
 * managing menu buttons in function of the order of the buttons
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    switch (_props.order) {
        case "first":
            menuButtonColors(data, data.menuHoverButton1Color);
            break;
        case "second":
            menuButtonColors(data, data.menuHoverButton2Color);
            break;
    }
    return data
}

/**
 * changing color values in array that listened by buttons
 * @param {main data} data 
 * @param {array of color for the button} buttonColors 
 */
function menuButtonColors(data, buttonColors) {
    if (buttonColors[0] == data.black) {
        buttonColors[0] = data.hoverMenuButtonColor;
        buttonColors[1] = data.black;
    } else {
        buttonColors[0] = data.black;
        buttonColors[1] = data.white;
    }
}