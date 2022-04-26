'use strict'

module.exports = (data, _props, event) => {
    data.menuHoverButton1Color=[data.black,data.white];
    data.menuHoverButton2Color=[data.black,data.white];
    data.navigation="userViewed";
    data.menuTimeLabel = "tempsPerdu";
    return data
}