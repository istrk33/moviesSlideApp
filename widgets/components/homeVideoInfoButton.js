module.exports = (data, props) => {
    return {
        type: "actionable",
        onPressed: {
            action: "switchMovieInfoUi",
            props: {
                from: "home",
                type: videoType,
                movieData: videoInfo
            }
        },
        child: {
            type: "container",
            decoration: {
                color: consts.movieInfoButtonColor[0],
            },
            child: {
                type: "flex",
                children: [
                    {
                        type: "icon",
                        value: "info",
                        color: consts.movieInfoButtonColor[1],
                        size: 35
                    }
                ]
            }
        }
    }
}