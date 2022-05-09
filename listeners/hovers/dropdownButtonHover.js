'use strict'

/**
 * managing hover event on items of the dropdown button
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (_props, event, api) => {
    switch (_props.srcButton) {
        case "tempsPerdu":
            if (data.dropDownButton1Color[0] == data.dropDownDefaultButtonColor) {
                data.dropDownButton1Color[0] = data.white;
                data.dropDownButton1Color[1] = data.dropDownDefaultButtonColor;
            } else {
                data.dropDownButton1Color[0] = data.dropDownDefaultButtonColor;
                data.dropDownButton1Color[1] = data.white;
            }
            // changeButtonColorState(data, data.dropDownButton1Color[0], data.dropDownButton1Color[1]);
            break;
        case "tempsAPerdre":
            // if (data.dropDownButton2Color[0] == data.dropDownDefaultButtonColor) {
            //     data.dropDownButton2Color[0] = data.white;
            //     data.dropDownButton2Color[1] = data.dropDownDefaultButtonColor;
            // } else {
            //     data.dropDownButton2Color[0] = data.dropDownDefaultButtonColor;
            //     data.dropDownButton2Color[1] = data.white;
            // }
            changeButtonColorState(data, data.dropDownButton2Color[0], data.dropDownButton2Color[1]);
            break;
        case "tempsEconomise":
            // if (data.dropDownButton3Color[0] == data.dropDownDefaultButtonColor) {
            //     data.dropDownButton3Color[0] = data.white;
            //     data.dropDownButton3Color[1] = data.dropDownDefaultButtonColor;
            // } else {
            //     data.dropDownButton3Color[0] = data.dropDownDefaultButtonColor;
            //     data.dropDownButton3Color[1] = data.white;
            // }
            changeButtonColorState(data, data.dropDownButton3Color[0], data.dropDownButton3Color[1]);
            break;
    }
    return data
}

/**
 * changing color values in an array
 * @param {main data} data 
 * @param {first index of the button color array} buttonColor1 
 * @param {second index of the button color array} buttonColor2 
 */
function changeButtonColorState(data, buttonColor1, buttonColor2) {
    if (buttonColor1 == data.dropDownDefaultButtonColor) {
        buttonColor1 = data.white;
        buttonColor2 = data.dropDownDefaultButtonColor;
    } else {
        buttonColor1 = data.dropDownDefaultButtonColor;
        buttonColor2 = data.white;
    }
}