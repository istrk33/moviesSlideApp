const consts = require("../../services/local/appConstsService");
const userService = require("../../services/userService");
const mainVideosService = require("../../services/mainVideosService");

module.exports = (_data, props) => {
    var data = _data[0];
    var currentVideoId = data.mainData.lenraCurrentVideoId;
    console.log("IDDDDDDDDDDDDDDDDDDDDDDDDD : " + currentVideoId);
    return {
        type: "container",
        decoration: {
            color: consts.darkbg
        },
        child: {
            type: "flex",
            direction: "vertical",
            fillParent: true,
            crossAxisAlignment: "center",
            children: [
                // {
                //     type: "widget",
                //     name: "overlayForTvShows",
                //     query: {
                //         "$find": {
                //             "_datastore": userService.datastoreName,
                //             "_id": "@me"
                //         }
                //     }
                // },
                {
                    type: "widget",
                    name: "menu",
                    props: {
                        page: "Main Page",
                        data: data.mainData
                    },
                },
                {
                    type: "widget",
                    name: "homeVideoInfo",
                    query: {
                        "$find": {
                            "_datastore": mainVideosService.datastoreName,
                            "_id": currentVideoId
                        }
                    }
                },
                // {
                //     type: "widget",
                //     name: "homeBottomButtons",
                //     query: {
                //         "$find": {
                //             "_datastore": userService.datastoreName,
                //             "_id": "@me"
                //         }
                //     }
                // }
            ]
        }
    }
}
