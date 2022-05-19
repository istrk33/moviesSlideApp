'use strict'

/**
 * bottom button (not viewed, interest and viewed)
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    console.log("////////////////////////////////////////////////////////////USER INTERESTS LIST WIDGET///////////////////////////////////////////////////////////////////");
    var arr = data.map(function (e) {
        return [e.data[0], e.data[1], e.data[2], e.data[3]];
    });
    console.log(arr);
    return {
        ...arr.sort(function (a, b) {
            if (a[1] < b[1]) {
                return -1;
            } else {
                return 1;
            };
        }).filter(function (element) {
            console.log(element);
            return (element[1].toLowerCase().includes(props.searchValue.toLowerCase()));
        }).map(element => {
            console.log(element);
            var movieId =  element[0];
            if (element[0].includes("tvshows_")) {
                var btnTxt = (element[4] == undefined) ? element[1] + ", de la S1" : element[1] + ", de la S" + element[4];
                var action = "showOverlaySeason";
            } else {
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
                        },
                        query: {
                            "$find": {
                                "_datastore": {
                                    "$eq": "userInterest"
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
                            // tvShowUpdate: (datas.userViewed[movieId] != null || datas.userViewed[movieId] != undefined),
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
