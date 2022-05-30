'use strict'

/**
 * bottom button (not viewed, interest and viewed)
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
    var arr = data.map(function (e) {
        return (String(e.data[0]).includes("tvshows_")) ? [e.data[0], e.data[1], e.data[2], e.data[3], e.data[4]] : [e.data[0], e.data[1], e.data[2], e.data[3]];
    });
    console.log(arr);
    return {
        // type:"text",
        // value:
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
            if (String(element[0]).includes("tvshows_")) {
                var movieId = element[0];
                var btnTxt = element[1] + ", S" + element[4];
            } else {
                var movieId = element[0];
                var btnTxt = element[1];
            }
            console.log("avant RETURNNNNNNNNNNNNNNNNNNNNNNNN");
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
                            arrayData: element,
                            // viewWidget: [
                            // ]
                        },
                        query: {
                            "$find": {
                                "_datastore": "userViewed"
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
