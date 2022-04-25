'use strict'

/**
 * managing colors of bottom actionable when user hovered them
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    switch (_props.buttonStr) {
        case "Vu":
            if (data.bottomButton1Color[0] == data.bottomButtonsColors[0][0]) {
                data.bottomButton1Color[0] = data.bottomButtonsColors[0][1];
                data.bottomButton1Color[1] = data.black;
            } else {
                data.bottomButton1Color[0] = data.bottomButtonsColors[0][0];
                data.bottomButton1Color[1] = data.white;
            }
            break;
        case "Intéressé":
            if (data.bottomButton2Color[0] == data.bottomButtonsColors[1][0]) {
                data.bottomButton2Color[1] = data.black;
                data.bottomButton2Color[0] = data.bottomButtonsColors[1][1];
            } else {
                data.bottomButton2Color[0] = data.bottomButtonsColors[1][0];
                data.bottomButton2Color[1] = data.white;
            }
            break;
        case "Pas vu":
            if (data.bottomButton3Color[0] == data.bottomButtonsColors[2][0]) {
                data.bottomButton3Color[1] = data.black;
                data.bottomButton3Color[0] = data.bottomButtonsColors[2][1];
            } else {
                data.bottomButton3Color[0] = data.bottomButtonsColors[2][0];
                data.bottomButton3Color[1] = data.white;
            }
            break;
    }
    return data
}