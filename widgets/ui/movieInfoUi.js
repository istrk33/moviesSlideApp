'use strict'

// import urlExist from 'url-exist';
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
    var currentFilmDurationStr = functions.computeMovieDuration(movie.length);
    var genresArray = movie.genres;
    var genresArrayStr = genresArray.join('  ');
    var charactersArray = await functions.getCharacters(data.apiKey, movie.id);
    var only5Chars = charactersArray;//charactersArray.sort(() => Math.random() - Math.random()).slice(0, 5)
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
                                                value: "" + movie.production_year,
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
                                    ...movie.platform_links.map(x => {
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
                                        value: movie.synopsis,
                                        style: {
                                            color: 0xFFFFFFFF,
                                            fontSize: 15
                                        }
                                    }]
                                }
                            },
                            // {
                            //     type: "flex",
                            //     spacing: 1,
                            //     padding: {
                            //         top: 2,
                            //         bottom: 2
                            //     },
                            //     children: [
                            //         {
                            //             type: "text",
                            //             value: movie.director,
                            //             style: {
                            //                 color: 0xFFFFFFFF,
                            //                 fontSize: 17
                            //             }
                            //         },
                            //         {
                            //             type: "text",
                            //             value: currentFilmDurationStr,
                            //             style: {
                            //                 color: 0xFFFFFFFF,
                            //                 fontSize: 17
                            //             }
                            //         }
                            //     ]
                            // },
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
                                            value: movie.director,
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
                                            value: "Acteurs",
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
                                            // padding: {
                                            //     bottom: 1,
                                            //     left: 1
                                            // },
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
                                                        value: "Acteur",
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
                                            // padding: {
                                            //     bottom: 1,
                                            //     left: 1
                                            // },
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
                                            ...only5Chars.sort().map(element => {
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