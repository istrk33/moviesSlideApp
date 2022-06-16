module.exports = (data, props) => {
    if (datas.currentMovieInfo.show != null) {
        var numberOfSeason = datas.currentMovieInfo.show.seasons;
        var currentFilmDurationStr = (numberOfSeason == 1) ? numberOfSeason + " saison" : numberOfSeason + " saisons";
        var img = "https://api.betaseries.com/pictures/shows?key=" + datas.apiKey + "&id=" + datas.currentMovieInfo.show.id + "&width=627&height=933";
        var director = (datas.currentMovieInfo.show.showrunner == null) ? "Inconnu" : datas.currentMovieInfo.show.showrunner.name;
        var videoType = "tvshow";
        var title = datas.currentMovieInfo.show.title;
        var year = datas.currentMovieInfo.show.creation;
        var videoInfo = datas.currentMovieInfo.show;
        var action = "showOverlaySeason";
    } else {
        var img = "https://api.betaseries.com/pictures/movies?key=" + datas.apiKey + "&id=" + datas.currentMovieInfo.movie.id + "&width=627&height=933";
        var currentFilmDurationStr = functions.computeMovieDuration(datas.currentMovieInfo.movie.length);
        var director = datas.currentMovieInfo.movie.director;
        var videoType = "movie";
        var title = datas.currentMovieInfo.movie.title;
        var year = datas.currentMovieInfo.movie.production_year;
        var videoInfo = datas.currentMovieInfo.movie;
        var action = "bottomButtonClick";
    }
    return {
        type: "flex",
        direction: "vertical",
        fillParent: true,
        crossAxisAlignment: "center",
        children: [
            {
                type: "flexible",
                child:
                {
                    type: "stack",
                    alignment: "topRight",
                    children: [
                        {
                            type: "image",
                            fit: "cover",
                            src: img
                        },
                        {
                            type: "widget",
                            name: "homeVideoInfo"
                        }
                    ]
                }
            },
            {
                type: "container",
                padding: {
                    bottom: 5,
                    top: 5,
                },
                child: {
                    type: "flex",
                    direction: "vertical",
                    crossAxisAlignment: "center",
                    mainAxisAlignment: "center",
                    spacing: 1,
                    children: [
                        {
                            type: "wrap",
                            children: [
                                {
                                    type: "text",
                                    value: title,
                                    textAlign: "center",
                                    style: {
                                        color: 0xFFFFFFFF,
                                        fontSize: 30
                                    }
                                }
                            ]
                        },
                        {
                            type: "text",
                            value: String(currentFilmDurationStr + " | " + year),
                            style: {
                                color: 0xFFFFFFFF,
                                fontSize: 20
                            }
                        },
                        {
                            type: "text",
                            value: String(director),
                            style: {
                                color: 0xFFFFFFFF,
                                fontSize: 20
                            }
                        }
                    ]
                }
            }
        ]
    }
}