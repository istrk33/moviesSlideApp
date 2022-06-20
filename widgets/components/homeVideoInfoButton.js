const consts = require("../../services/local/appConstsService");
module.exports = (data, props) => {
    return {
        type: "actionable",
        onPressed: {
            action: "switchMovieInfoUi",
            props: {
                from: "home",
                type: props.videoType,
                movieData: data.videoInfo
            }
        },
        child: {
            type: "container",
            decoration: {
                color: consts.movieInfoButtonColor[0],
            },
            child: {
                type: "icon",
                value: "info",
                color: consts.movieInfoButtonColor[1],
                size: 35
            }
        }
    }
}