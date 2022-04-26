'use strict'

module.exports = async (data, props) => {
    const functions = require("../../resources/functions");
    if (data.movieInfoToSee.show != null || data.movieInfoToSee.show != undefined) {
        var show = data.movieInfoToSee.show;
        var title = show.title;
        var img = "https://api.betaseries.com/pictures/shows?key=" + data.apiKey + "&id=" + data.movieInfoToSee.show.id;
        var year = show.creation;
        if (show.platforms == null) {
            var platforms = [];
        } else {
            var platforms = show.platforms.svods;
        }
        var numberOfStar = parseInt(show.notes.mean);
        var arr = Array(numberOfStar).fill("star");
        (show.notes.mean % 1 != 0) ? arr.splice(arr.length, 0, "star_half") : "";
        while (arr.length < 5) {
            arr.splice(arr.length, 0, "star_border_outlined");
        }
        if (show.showrunner == null) {
            var director = "Inconnu";
        } else {
            var director = show.showrunner.name;
        }
        var genresArray = Object.values(show.genres);
        var genresArrayStr = genresArray.join('\n');
        var synopsis = show.description;
        var charactersArray = await functions.getTvShowsCharacters(data.apiKey, show.id);
        var episodesBySeasons = show.seasons_details.map(x => [x.number, x.episodes * (show.length * 60)]);
        var strArray = [episodesBySeasons.length + " saisons"]
        episodesBySeasons.forEach(element => {
            strArray.push("Saison " + element[0] + " : " + functions.computeMovieDuration(element[1]));
        });
        var currentFilmDurationStr = strArray.join("\n");
    } else {
        var movie = data.movieInfoToSee.movie;
        var title = movie.title;
        var img = "https://api.betaseries.com/pictures/movies?key=" + data.apiKey + "&id=" + movie.id;
        var year = movie.production_year;
        var platforms = movie.platform_links;
        var synopsis = movie.synopsis;
        // get characters https://api.betaseries.com/movies/characters?key=941cc48f228b&id=
        // characters pictures https://api.betaseries.com/pictures/characters?key=941cc48f228b&id=
        // pour la gestion d'affichage des étoiles en fonctions de la note
        var numberOfStar = parseInt(movie.notes.mean);
        var arr = Array(numberOfStar).fill("star");
        (movie.notes.mean % 1 != 0) ? arr.splice(arr.length, 0, "star_half") : "";
        while (arr.length < 5) {
            arr.splice(arr.length, 0, "star_border_outlined");
        }
        var director = movie.director;
        var currentFilmDurationStr = functions.computeMovieDuration(movie.length);
        var genresArrayStr = movie.genres.join('\n');
        var charactersArray = await functions.getCharacters(data.apiKey, movie.id);
    }
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
                                    value: title,
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
                                padding: {
                                    top: 1,
                                    bottom: 1
                                },
                                child:
                                {
                                    type: "flex",
                                    crossAxisAlignment: "center",
                                    children: [
                                        {
                                            type: "icon",
                                            value: "calendar_today",
                                            color: 0xFFFFFFFF,
                                            size: 25
                                        },
                                        {
                                            type: "container",
                                            padding: {
                                                top: 1,
                                                left: 1
                                            },
                                            child:
                                            {
                                                type: "text",
                                                value: "" + year,
                                                style: {
                                                    color: 0xFFFFFFFF,
                                                    fontSize: 17
                                                }
                                            },
                                        }
                                    ]
                                },
                            },
                            {
                                type: "flex",
                                children: [
                                    ...platforms.map(x => {
                                        return {
                                            type: "image",
                                            src: "https://api.betaseries.com/pictures/platforms?key=" + data.apiKey + "&id=" + x.id + "&height=40&width=40"
                                        }
                                    })
                                ]
                            },
                            {
                                type: "flex",
                                crossAxisAlignment: "center",
                                padding: {
                                    bottom: 1
                                },
                                children: [
                                    ...arr.map(element => {
                                        return {
                                            type: "icon",
                                            value: element,
                                            color: 0xFFE6B800,
                                            size: 25
                                        }
                                    })
                                ]
                            },
                            {
                                type: "container",
                                constraints: {
                                    maxWidth: 500,
                                    maxHeight: 800,
                                    minHeight: 50,
                                    minWidth: 200
                                },
                                padding: {
                                    bottom: 1
                                },
                                child:
                                {
                                    type: "flex",
                                    direction: "vertical",
                                    padding: {
                                        right: 0.5,
                                        left: 0.5,
                                    },
                                    children: [{
                                        type: "text",
                                        value: synopsis,
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 15
                                        }
                                    }]
                                }
                            },
                            {
                                type: "flex",
                                padding: {
                                    bottom: 1
                                },
                                children: [
                                    {
                                        type: "icon",
                                        value: "timer",
                                        color: 0xFFFFFFFF,
                                        size: 25
                                    }, {
                                        type: "container",
                                        padding: {
                                            top: 1,
                                            left: 1
                                        },
                                        child: {
                                            type: "text",
                                            value: currentFilmDurationStr,
                                            style: {
                                                color: 0xFFFFFFFF,
                                                fontSize: 17
                                            }
                                        }
                                    }]
                            },
                            {
                                type: "flex",
                                padding: {
                                    bottom: 1
                                },
                                children: [
                                    {
                                        type: "icon",
                                        value: "person",
                                        color: 0xFFFFFFFF,
                                        size: 25
                                    },
                                    {
                                        type: "container",
                                        padding: {
                                            top: 1,
                                            left: 1
                                        },
                                        child: {
                                            type: "text",
                                            value: director,
                                            style: {
                                                color: 0xFFFFFFFF,
                                                fontSize: 17
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                type: "flex",
                                children: [
                                    {
                                        type: "icon",
                                        value: "category",
                                        color: 0xFFFFFFFF,
                                        size: 25
                                    },
                                    {
                                        type: "flex",
                                        direction: "vertical",
                                        crossAxisAlignment: "center",
                                        padding: {
                                            top: 1,
                                            bottom: 1,
                                            left: 1
                                        },
                                        children: [
                                            {
                                                type: "text",
                                                value: genresArrayStr,
                                                style: {
                                                    color: 0xFFFFFFFF,
                                                    fontSize: 17
                                                }
                                            }
                                        ]
                                    },
                                ]
                            }
                            // from here to the bottom is all for the grid display
                            , {
                                type: "flex",
                                padding: {
                                    bottom: 1
                                },
                                children: [
                                    {
                                        type: "icon",
                                        value: "people",
                                        size: 25,
                                        color: 0xFFFFFFFF,
                                    }, {
                                        type: "container",
                                        padding: {
                                            top: 1,
                                            bottom: 1,
                                            left: 1
                                        },
                                        child: {
                                            type: "text",
                                            value: "Acteurs(rices)",
                                            style: {
                                                color: 0xFFFFFFFF,
                                                fontSize: 17
                                            }
                                        },
                                    }
                                ]
                            },
                            {
                                type: "container",
                                child: {
                                    type: "flex",
                                    fillParent: true,
                                    crossAxisAlignment: "center",
                                    mainAxisAlignment: "center",
                                    children: [
                                        {
                                            type: "container",
                                            constraints: {
                                                maxHeight: 70,
                                                maxWidth: 160,
                                                minWidth: 160,
                                                minHeight: 25,
                                            },
                                            border: {
                                                top: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                bottom: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                left: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                right: {
                                                    color: data.white,
                                                    width: 1
                                                }
                                            },
                                            child: {
                                                type: "flex",
                                                direction: "vertical",
                                                fillParent: true,
                                                crossAxisAlignment: "center",
                                                mainAxisAlignment: "center",
                                                children: [
                                                    {
                                                        type: "text",
                                                        value: "Acteur(rice)",
                                                        style: {
                                                            color: 0xFFFFFFFF,
                                                            fontSize: 17
                                                        }
                                                    }
                                                ]
                                            },
                                        },
                                        {
                                            type: "container",
                                            constraints: {
                                                maxHeight: 70,
                                                maxWidth: 160,
                                                minWidth: 160,
                                                minHeight: 25,
                                            },
                                            border: {
                                                top: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                bottom: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                left: {
                                                    color: data.white,
                                                    width: 1
                                                },
                                                right: {
                                                    color: data.white,
                                                    width: 1
                                                }
                                            },
                                            child: {
                                                type: "flex",
                                                direction: "vertical",
                                                fillParent: true,
                                                crossAxisAlignment: "center",
                                                mainAxisAlignment: "center",
                                                children: [
                                                    {
                                                        type: "text",
                                                        value: "Rôle",
                                                        style: {
                                                            color: 0xFFFFFFFF,
                                                            fontSize: 17
                                                        }
                                                    }
                                                ]
                                            },
                                        }
                                    ]
                                }
                            }
                            , {
                                type: "flex",
                                children: [
                                    {
                                        type: "flex",
                                        direction: "vertical",
                                        fillParent: true,
                                        children: [
                                            ...charactersArray.sort().map(element => {
                                                return {
                                                    type: "container",
                                                    border: {
                                                        top: {
                                                            color: data.white,
                                                            width: 1
                                                        },
                                                        bottom: {
                                                            color: data.white,
                                                            width: 1
                                                        },
                                                        left: {
                                                            color: data.white,
                                                            width: 1
                                                        },
                                                        right: {
                                                            color: data.white,
                                                            width: 1
                                                        }
                                                    },
                                                    child: {
                                                        type: "flex",
                                                        children: [
                                                            {
                                                                type: "container",
                                                                constraints: {
                                                                    maxHeight: 70,
                                                                    maxWidth: 160,
                                                                    minWidth: 160,
                                                                    minHeight: 25,
                                                                },
                                                                border: {
                                                                    left: {
                                                                        color: data.white,
                                                                        width: 1
                                                                    },
                                                                    right: {
                                                                        color: data.white,
                                                                        width: 1
                                                                    }
                                                                },
                                                                child:
                                                                {
                                                                    type: "flex",
                                                                    crossAxisAlignment: "center",
                                                                    mainAxisAlignment: "center",
                                                                    direction: "vertical",
                                                                    children: [
                                                                        {
                                                                            type: "container",
                                                                            padding: {
                                                                                top: 1,
                                                                                left: 1,
                                                                                bottom: 1,
                                                                                right: 1
                                                                            },
                                                                            child:
                                                                            {
                                                                                type: "text",
                                                                                value: element.actor,
                                                                                style: {
                                                                                    color: 0xFFFFFFFF,
                                                                                    fontSize: 17
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                type: "container",
                                                                constraints: {
                                                                    maxHeight: 70,
                                                                    maxWidth: 160,
                                                                    minWidth: 160,
                                                                    minHeight: 25,
                                                                },
                                                                border: {
                                                                    left: {
                                                                        color: data.white,
                                                                        width: 1
                                                                    },
                                                                    right: {
                                                                        color: data.white,
                                                                        width: 1
                                                                    }
                                                                },
                                                                child:
                                                                {
                                                                    type: "flex",
                                                                    direction: "vertical",
                                                                    crossAxisAlignment: "center",
                                                                    mainAxisAlignment: "center",
                                                                    children: [
                                                                        {
                                                                            type: "container",
                                                                            padding: {
                                                                                top: 1,
                                                                                left: 1,
                                                                                bottom: 1,
                                                                                right: 1
                                                                            },
                                                                            child:
                                                                            {
                                                                                type: "text",
                                                                                value: element.name,
                                                                                style: {
                                                                                    color: 0xFFFFFFFF,
                                                                                    fontSize: 17
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            })
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }
}