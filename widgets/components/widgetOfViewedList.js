'use strict'

/**
 * bottom button (not viewed, interest and viewed)
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    console.log(data);
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
            if (datas.userViewed["tvshows_" + element[0]] != null || datas.userViewed["tvshows_" + element[0]] != undefined) {
                var movieId = "tvshows_" + element[0];
                var btnTxt = element[1] + ", S" + element[4];
            } else {
                var movieId = element[0];
                var btnTxt = element[1];
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
                            src: "viewed",
                            from: "other",
                            movieId: movieId,
                            height: 50,
                            width: 250,
                            arrayData: datas.userViewed,
                            // viewWidget: [
                            // ]
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
                        name: "listButton",
                        props: {
                            borderColor: 0xFFFA5656,
                            src: "viewed",
                            movieId: movieId,
                            iconValue: "delete",
                            iconColor: 0xFFFA5656,
                            action: "deleteViewedMovie",
                        }
                    }
                ]
            }
        })
    }
}
