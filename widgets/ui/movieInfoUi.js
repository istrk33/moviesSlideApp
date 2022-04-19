'use strict'
module.exports = async (data, props) => {
    const functions = require("../../resources/functions");
    var movie = data.movieInfoToSee.movie;
    var img = "https://api.betaseries.com/pictures/movies?key=" + data.apiKey + "&id=" + movie.id;
    // get characters https://api.betaseries.com/movies/characters?key=941cc48f228b&id=
    // characters pictures https://api.betaseries.com/pictures/characters?key=941cc48f228b&id=
    // pour la gestion d'affichage des étoiles en fonctions de la note
    var numberOfStar = parseInt(movie.notes.mean);
    var arr = Array(numberOfStar).fill("star");
    (movie.notes.mean % 1 != 0) ? arr.splice(arr.length, 0, "star_half") : "";
    while (arr.length < 5) {
        arr.splice(arr.length, 0, "star_border_outlined");
    }

    //pour la gestion d'affichage de la durée du film en fonction des secondes
    var h = Math.floor(movie.length / 3600);
    var m = Math.floor(movie.length % 3600 / 60);
    var s = Math.floor(movie.length % 3600 % 60);
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

    var genresArray = movie.genres;
    var charactersArray = await functions.getCharacters(data.apiKey, movie.id);
    var only5Chars = charactersArray.sort(() => Math.random() - Math.random()).slice(0, 5)
    // console.log(charactersArray);
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
                                direction: "vertical",
                                mainAxisAlignment: "center",
                                padding: {
                                    top: 3,
                                    bottom: 3
                                },
                                children: [{
                                    type: "text",
                                    value: movie.title,
                                    style: {
                                        color: 0xFFFFFFFF,
                                        fontSize: 30
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
                                                fontSize: 17
                                            }
                                        },
                                        ...arr.map(element => {
                                            return {
                                                type: "icon",
                                                value: element,
                                                color: 0xFFE6B800,
                                                size: 25
                                            }
                                        })
                                    ]
                                }
                            }, {
                                type: "container",
                                constraints: {
                                    maxWidth: 500,
                                    maxHeight:800,
                                    minHeight:50,
                                    minWidth:200
                                },
                                child:
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
                                            fontSize: 17
                                        }
                                    }]
                                }
                            }, {
                                type: "flex",
                                spacing: 1,
                                padding: {
                                    top: 2,
                                    bottom: 2
                                },
                                children: [
                                    {
                                        type: "text",
                                        value: movie.director,
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 17
                                        }
                                    },
                                    {
                                        type: "text",
                                        value: currentFilmDurationStr,
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 17
                                        }
                                    }
                                ]
                            },
                            {
                                type: "text",
                                value: "Genres",
                                style: {
                                    color: 0xFFFFFFFF,
                                    fontSize: 25
                                }
                            }
                            , {
                                type: "flex",
                                direction: "horizontal",
                                crossAxisAlignment: "center",
                                spacing: 2,
                                padding: {
                                    top: 2,
                                    bottom: 2
                                },
                                children: [
                                    ...genresArray.sort().map(element => {
                                        return {
                                            type: "text",
                                            value: element,
                                            style: {
                                                color: 0xFFFFFFFF,
                                                fontSize: 17
                                            }
                                        }
                                    }
                                    )]
                            },
                            {
                                type: "text",
                                value: "Acteurs",
                                style: {
                                    color: 0xFFFFFFFF,
                                    fontSize: 17
                                }
                            },
                            {
                                type: "flex",
                                direction: "vertical",
                                crossAxisAlignment: "center",
                                spacing: 2,
                                // padding: {
                                //     top: 2,
                                //     bottom: 2
                                // },

                                //filter pour les films n'ayant aps d'images
                                children: [
                                    ...only5Chars.sort().map(element => {
                                        return {
                                            type: "flex",
                                            direction: "vertical",
                                            spacing: 2,
                                            children: [
                                                {
                                                    type: "image",
                                                    src: "https://api.betaseries.com/pictures/characters?key=" + data.apiKey + "&id=" + element.id,
                                                    loadingPlaceholder: {
                                                        type: "image",
                                                        fit: "cover",
                                                        src: "https://www.burmunk.am/themes/burmunk/assets/no-product-image.png"
                                                    },
                                                    framePlaceholder: {
                                                        type: "image",
                                                        fit: "cover",
                                                        src: "https://www.burmunk.am/themes/burmunk/assets/no-product-image.png"
                                                    },
                                                }, {
                                                    type: "text",
                                                    value: element.actor + " pour le rôle de " + element.name,
                                                    style: {
                                                        color: 0xFFFFFFFF,
                                                        fontSize: 17
                                                    }
                                                }
                                            ]
                                        }
                                    }),
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }
}