'use strict'

/**
 * bottom button (not viewed, interest and viewed)
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    console.log(data);
    // var arr = Object.values(datas.userInterests);
    var arr = data;
    return {
        ...arr.sort(function (a, b) {
            if (a[1] < b[1]) {
                return -1;
            } else {
                return 1;
            };
        }).filter(function (element) {
            return (element[1].toLowerCase().includes(datas.searchValue.toLowerCase()));
        }).map(element => {
            if (datas.userInterests["tvshows_" + element[0]] != null || datas.userInterests["tvshows_" + element[0]] != undefined) {
                var movieId = "tvshows_" + element[0];
                var btnTxt = (element[4] == undefined) ? element[1] + ", de la S1" : element[1] + ", de la S" + element[4];
                var action = "showOverlaySeason";
            } else {
                var movieId = element[0];
                var btnTxt = element[1];
                var action = "viewedMovieButton";
            }
            return {
                type: "flex",
                mainAxisAlignment: "center",
                crossAxisAlignment: "center",
                padding: {
                    top: 1.5,
                    bottom: 1.5
                },
                children: [
                    {
                        type: "widget",
                        name: "movieButton",
                        props: {
                            buttonText: btnTxt,
                            src: "interests",
                            movieId: movieId,
                            height: 50,
                            width: 200,
                            arrayData: datas.userInterests,
                        },
                        query: {
                            "$find": {
                                "_datastore": {
                                    "$eq": "general"
                                }
                            }
                        }
                    },
                    {
                        type: "widget",
                        name: "listButton",
                        props: {
                            borderColor: 0xFFFA5656,
                            // tvShowUpdate: true,
                            src: "interests",
                            movieId: movieId,
                            iconValue: "delete",
                            iconColor: 0xFFFA5656,
                            action: "deleteViewedMovie",
                        }
                    },
                    {
                        type: "widget",
                        name: "listButton",
                        props: {
                            borderColor: 0xFF36CD6B,
                            tvShowUpdate: (datas.userViewed[movieId] != null || datas.userViewed[movieId] != undefined),
                            src: "interests",
                            movieId: movieId,
                            iconValue: "done",
                            iconColor: 0xFF36CD6B,
                            action: action,
                        },
                    }
                ]
            }
        }),
    }
}
