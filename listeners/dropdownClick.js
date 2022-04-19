'use strict'

module.exports = (data, _props, event) => {
    switch (_props.srcButton) {
        case "tempsPerdu":
            data.menuTimeLabel = "tempsPerdu";
            break;
        case "tempsAPerdre":
            data.menuTimeLabel = "tempsAPerdre";
            break;
        case "tempsEconomise":
            data.menuTimeLabel = "tempsEconomise";
            break;
    }
    return data
}