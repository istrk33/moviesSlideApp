const consts = require("../../services/local/appConstsService");
const userService = require("../../services/userService");

module.exports = (_data, props) => {
    console.log("DATAAAAAAAAAAAAAAAAAAA");
    console.log(_data);
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
                {
                    type: "widget",
                    name: "overlayForTvShows",
                    query: {
                        "$find": {
                            "_datastore": userService.datastoreName,
                            "_id": "@me"
                        }
                    }
                },
                {
                    type: "widget",
                    name: "menu",
                    props: {
                        page: "Main Page"
                    },
                    query: {
                        "$find": {
                            "_datastore": userService.datastoreName,
                            "_id": "@me"
                        }
                    }
                },
                {
                    type: "widget",
                    name: "homeVideoInfo",
                    query: {
                        "$find": {
                            "_datastore": userService.datastoreName,
                            "_id": "@me"
                        }
                    },
                    props:{
                        lenraMovieId:"",
                    }
                },
                {
                    type: "widget",
                    name: "homeBottomButtons",
                    query: {
                        "$find": {
                            "_datastore": userService.datastoreName,
                            "_id": "@me"
                        }
                    }
                }
            ]
        }
    }
}
