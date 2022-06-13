module.exports = async (_data, props) => {
    var datas = data[0].data;
    if (datas.movieInfoToSee.show != null || datas.movieInfoToSee.show != undefined) {
        var show = datas.movieInfoToSee.show;
        var title = show.title;
        var img = "https://api.betaseries.com/pictures/shows?key=" + datas.apiKey + "&id=" + datas.movieInfoToSee.show.id + "&height=300";
        var year = show.creation;
        var platforms = (show.platforms == null) ? [] : show.platforms.svods;
        var director = (show.showrunner == null) ? "Inconnu" : show.showrunner.name;
        var arr = functions.getStars(show);
        var genresArray = Object.values(show.genres);
        var genresArrayStr = genresArray.join('\n');
        var synopsis = show.description;
        var charactersArray = await functions.getTvShowsCharacters(datas.apiKey, show.id);
        var episodesBySeasons = show.seasons_details.map(x => [x.number, x.episodes * (show.length * 60)]);
        var strArray = [episodesBySeasons.length + " saisons"]
        episodesBySeasons.forEach(element => {
            strArray.push("Saison " + element[0] + " : " + functions.computeMovieDuration(element[1]));
        });
        var currentFilmDurationStr = strArray.join("\n");
    } else {
        var movie = datas.movieInfoToSee.movie;
        var title = movie.title;
        var img = "https://api.betaseries.com/pictures/movies?key=" + datas.apiKey + "&id=" + movie.id + "&height=300";
        var year = movie.production_year;
        var platforms = movie.platform_links;
        var synopsis = movie.synopsis;
        var arr = functions.getStars(movie);
        var director = movie.director;
        var currentFilmDurationStr = functions.computeMovieDuration(movie.length);
        var genresArrayStr = movie.genres.join('\n');
        var charactersArray = await functions.getCharacters(datas.apiKey, movie.id);
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
                    },
                    query: {
                        "$find": {
                            "_datastore": {
                                "$eq": "vars"
                            }
                        }
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
                                    textAlign: "center",
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
                                                // top: 1,
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
                                            src: "https://api.betaseries.com/pictures/platforms?key=" + datas.apiKey + "&id=" + x.id + "&height=40&width=40"
                                        }
                                    })
                                ]
                            },
                            {
                                type: "flex",
                                crossAxisAlignment: "center",
                                padding: {
                                    top: 1,
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
                                        textAlign: "justify",
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
                            },
                            {
                                type: "widget",
                                name: "charactersGrid",
                                props: {
                                    charactersArray: charactersArray
                                },
                                query: {
                                    "$find": {
                                        "_datastore": {
                                            "$eq": "vars"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
}