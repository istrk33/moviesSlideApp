const consts = require("../../services/local/appConstsService");
const functions = require("../../services/local/videoAPIService");

module.exports = (_data, props) => {
    var data = props.data;
    var menudisp;
    switch (data.menuTimeLabel) {
        case "tempsPerdu":
            menudisp = functions.computeMenuTime(data.totalWastedTime);
            break;
        case "tempsAPerdre":
            menudisp = functions.computeMenuTime(data.potentialWasteTime);
            break;
        case "tempsEconomise":
            menudisp = functions.computeMenuTime(data.totalSavedTime);
            break;
    }
    return {
        type: "dropdownButton",
        text: String(menudisp),
        icon: {
            type: "icon",
            value: "movie",
            color: 0xFF828282,
            size: 25
        },
        child: {
            type: "menu",
            children: [
                {
                    type: "flex",
                    direction: "vertical",
                    crossAxisAlignment: "stretch",
                    children: [
                        {
                            type: "widget",
                            name: "dropMenuButton",
                            props: {
                                srcButton: "tempsPerdu",
                                icon: "remove_red_eye",
                                buttonText: "Temps Perdu",
                                color: consts.dropDownButton1Color[0],
                                iconColor: consts.dropDownButton1Color[1]
                            }
                        },
                        {
                            type: "widget",
                            name: "dropMenuButton",
                            props: {
                                srcButton: "tempsAPerdre",
                                icon: "watch_later",
                                buttonText: "Temps à Perdre",
                                color: consts.dropDownButton2Color[0],
                                iconColor: consts.dropDownButton2Color[1]
                            }, 
                            // query: {
                            //     "$find": {
                            //         "_datastore": {
                            //             "$eq": "general"
                            //         }
                            //     }
                            // }
                        },
                        {
                            type: "widget",
                            name: "dropMenuButton",
                            props: {
                                srcButton: "tempsEconomise",
                                icon: "close",
                                buttonText: "Temps Economisé",
                                color: consts.dropDownButton3Color[0],
                                iconColor: consts.dropDownButton3Color[1]
                            }, 
                            // query: {
                            //     "$find": {
                            //         "_datastore": {
                            //             "$eq": "general"
                            //         }
                            //     }
                            // }
                        },
                    ]
                }
            ]
        }
    }
}
