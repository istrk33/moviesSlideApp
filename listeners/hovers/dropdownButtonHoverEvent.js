'use strict'

/**
 * managing hover event on items of the dropdown button
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    switch (_props.srcButton) {
        case "tempsPerdu":
            if (data.dropDownButton1Color[0] == data.dropDownDefaultButtonColor) {
                data.dropDownButton1Color[0] = data.white;
                data.dropDownButton1Color[1] = data.dropDownDefaultButtonColor;
            } else {
                data.dropDownButton1Color[0] = data.dropDownDefaultButtonColor;
                data.dropDownButton1Color[1] = data.white;
            }
            break;
        case "tempsAPerdre":
            if (data.dropDownButton2Color[0] == data.dropDownDefaultButtonColor) {
                data.dropDownButton2Color[0] = data.white;
                data.dropDownButton2Color[1] = data.dropDownDefaultButtonColor;
            } else {
                data.dropDownButton2Color[0] = data.dropDownDefaultButtonColor;
                data.dropDownButton2Color[1] = data.white;
            }
            break;
        case "tempsEconomise":
            if (data.dropDownButton3Color[0] == data.dropDownDefaultButtonColor) {
                data.dropDownButton3Color[0] = data.white;
                data.dropDownButton3Color[1] = data.dropDownDefaultButtonColor;
            } else {
                data.dropDownButton3Color[0] = data.dropDownDefaultButtonColor;
                data.dropDownButton3Color[1] = data.white;
            }
            break;
    }
    return data
}