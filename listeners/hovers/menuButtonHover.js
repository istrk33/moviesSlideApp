'use strict'

/**
 * managing menu buttons in function of the order of the buttons
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = async(_props, event, api) => {
    switch (_props.order) {
        case "first":
            menuButtonColors(datas, datas.menuHoverButton1Color);
            break;
        case "second":
            menuButtonColors(datas, datas.menuHoverButton2Color);
            break;
    }
    return service.put(api, datas).then(function (response) {
        response.data
    });
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