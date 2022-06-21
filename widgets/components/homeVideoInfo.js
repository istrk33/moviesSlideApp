const functions = require("../../services/local/videoAPIService");

module.exports = (_data, props) => {
    console.log("HOME VIDEO INFO");

    var allFilms = _data.sort(function (a, b) {
        return b._id - a._id;
    }).reverse();
    var data = allFilms[props.currentIndex];

    var lenraDataId = data._id;
    var isTvShow = data.isTvShow;
    var videoInfo = data.videoDetails;
    if (isTvShow) {
        var numberOfSeason = videoInfo.seasons;
        var currentFilmDurationStr = (numberOfSeason == 1) ? numberOfSeason + " saison" : numberOfSeason + " saisons";
        var img = videoInfo.img;
        var director = (videoInfo.showrunner == null) ? "Inconnu" : videoInfo.showrunner.name;
        var videoType = "tvshow";
        var title = videoInfo.title;
        var year = videoInfo.creation;
        var action = "showOverlaySeason";
    } else {
        var img = videoInfo.img;
        var currentFilmDurationStr = functions.computeMovieDuration(videoInfo.length);
        var director = videoInfo.director;
        var videoType = "movie";
        var title = videoInfo.title;
        var year = videoInfo.production_year;
        var videoInfo = videoInfo.movie;
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
                            name: "homeVideoInfoButton",
                            props: {
                                videoType: videoType,
                            }
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
            },
            {
                type: "widget",
                name: "homeBottomButtons",
                props: {
                    videoType: videoType,
                    videoId: lenraDataId,
                    action: action
                }
            }
        ]
    }
}