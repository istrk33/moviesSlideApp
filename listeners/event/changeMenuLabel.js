const userService = require("../../services/userService");
module.exports = async (_props, event, api) => {
    var userData = (await userService.getUser(api));
    console.log(userData);
    var id = userData._id;
    var data = userData.mainData;
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
    return await userService.updateUser(api, userData, id);
}