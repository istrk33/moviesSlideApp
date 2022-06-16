const consts = require("../../services/local/appConstsService");

module.exports = (_data, props) => {
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
                            name: "dropdownMenuButton",
                            props: {
                                srcButton: "tempsPerdu",
                                icon: "remove_red_eye",
                                buttonText: "Temps Perdu",
                                color: datas.dropDownButton1Color[0],
                                iconColor: datas.dropDownButton1Color[1]
                            }
                        },
                        {
                            type: "widget",
                            name: "dropdownMenuButton",
                            props: {
                                srcButton: "tempsAPerdre",
                                icon: "watch_later",
                                buttonText: "Temps à Perdre",
                                color: datas.dropDownButton2Color[0],
                                iconColor: datas.dropDownButton2Color[1]
                            }, query: {
                                "$find": {
                                    "_datastore": {
                                        "$eq": "general"
                                    }
                                }
                            }
                        },
                        {
                            type: "widget",
                            name: "dropdownMenuButton",
                            props: {
                                srcButton: "tempsEconomise",
                                icon: "close",
                                buttonText: "Temps Economisé",
                                color: datas.dropDownButton3Color[0],
                                iconColor: datas.dropDownButton3Color[1]
                            }, query: {
                                "$find": {
                                    "_datastore": {
                                        "$eq": "general"
                                    }
                                }
                            }
                        },
                    ]
                }
            ]
        }
    }
}
