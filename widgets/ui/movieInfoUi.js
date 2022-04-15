'use strict'

module.exports = (data, props) => {
    var movie = data.movieInfoToSee.movie;
    var img = "https://api.betaseries.com/pictures/movies?key=941cc48f228b&id=" + movie.id;
    var h = Math.floor(movie.length / 3600);
    var m = Math.floor(movie.length % 3600 / 60);
    var s = Math.floor(movie.length % 3600 % 60);
    // var isRoundNote = false;
    // (movie.notes.mean % 1 == 0) ? isRoundNote = true : "";
    var numberOfStar = parseInt(movie.notes.mean);
    var arr = Array(numberOfStar).fill("star");
//     .splice(
//   zoo.length, // We want add at the END of our array
//   0, // We do NOT want to remove any item
//   '🐧', '🐦', '🐤', // These are the items we want to add
// );
    (movie.notes.mean % 1 != 0) ? arr.splice(arr.length,0,"star_half") : "";
    while(arr.length<5){
        arr.splice(arr.length,0,"star_border_outlined");
    }
    // arr=arr.reverse();

    if (h.toString().length < 2) {
        h = "0" + h;
    }
    if (s.toString().length < 2) {
        s = "0" + s;
    }
    if (m.toString().length < 2) {
        m = "0" + m;
    }
    var currentFilmDurationStr = h + ":" + m + ":" + s;
    return {
        type: "container",
        decoration: {
            color: 0xFF212121
        },
        child: {
            type: "flex",
            direction: "vertical",
            crossAxisAlignment: "center",
            children: [
                {
                    type: "widget",
                    name: "menu",
                    props: {
                        page: "User Viewed"
                    }
                },
                {
                    type: "flexible",
                    fit: "tight",
                    child:
                    {
                        type: "flex",
                        direction: "vertical",
                        crossAxisAlignment: "center",
                        fillParent: true,
                        scroll: true,
                        children: [
                            {
                                type: "flex",
                                padding: {
                                    top: 3,
                                    bottom: 3
                                },
                                children: [{
                                    type: "text",
                                    value: movie.title,
                                    style: {
                                        color: 0xFFFFFFFF,
                                        fontSize: 20
                                    }
                                }]
                            },
                            {
                                type: "image",
                                fit: "cover",
                                src: img
                            },
                            {
                                type: "container",
                                child: {
                                    type: "flex",
                                    crossAxisAlignment: "center",
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: "Année de sortie " + movie.production_year,
                                            style: {
                                                color: 0xFFFFFFFF,
                                                fontSize: 11
                                            }
                                        },
                                        ...arr.map(element => {
                                            return {
                                                type: "icon",
                                                value: element,
                                                color: 0xFFE6B800,
                                                size:20
                                            }
                                        })
                                    ]
                                }
                            },
                            {
                                type: "flex",
                                direction: "vertical",
                                padding: {
                                    bottom: 0.5,
                                    right: 0.5,
                                    top: 0.5,
                                    left: 0.5,
                                },
                                children: [{
                                    type: "text",
                                    value: movie.synopsis,
                                    style: {
                                        color: 0xFFFFFFFF,
                                        fontSize: 11
                                    }
                                }]
                            },
                            {
                                type: "text",
                                value: movie.director,
                                style: {
                                    color: 0xFFFFFFFF,
                                    fontSize: 11
                                }
                            },
                            {
                                type: "text",
                                value: currentFilmDurationStr,
                                style: {
                                    color: 0xFFFFFFFF,
                                    fontSize: 11
                                }
                            },
                        ]
                    }
                }
            ]
        }
    }
}