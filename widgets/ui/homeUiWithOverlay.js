'use strict'

module.exports = (data, props) => {
  const functions = require("../../resources/functions");
  var numberOfSeason = Math.floor(data.currentTvShowViewedSeasons);
  var numberOfViewedSeason = 0;
  var numberOfViewedEpisode = 0;
  var numberOfNotViewedEpisode = 0;
  data.currentMovieInfo.show.seasons_details.forEach(element => {
    if (parseInt(element.number) <= numberOfSeason) {
      numberOfViewedEpisode += parseInt(element.episodes);
      numberOfViewedSeason += 1;
    }else{
      numberOfNotViewedEpisode+=parseInt(element.episodes);
    }
  });
  var totalViewedTime = numberOfViewedEpisode * data.currentMovieInfo.show.length * 60;
  var totalNotViewedTime = numberOfNotViewedEpisode * data.currentMovieInfo.show.length * 60;
  return {
    type: "container",
    decoration: {
      color: data.darkbg
    },
    child: {
      type: "overlayEntry",
      child: {
        type: "flex",
        direction: "vertical",
        mainAxisAlignment: "center",
        crossAxisAlignment: "center",
        children: [
          {
            type: "text",
            value: "Nombre de saisons vues " + data.currentTvShowViewedSeasons + "/" + data.currentMovieInfo.show.seasons + "\n Équivalent à " + functions.computeMenuTime(totalViewedTime),
            style: {
              color: 0xFFFFFFFF
            }
          },
          {
            type: "slider",
            label: "" + data.currentTvShowViewedSeasons,
            min: 1,
            divisions: parseInt(data.currentMovieInfo.show.seasons),
            max: parseInt(data.currentMovieInfo.show.seasons),
            autofocus: true,
            // max: parseInt(5),
            // value:data.currentTvShowViewedSeasons,
            value: parseInt(data.currentTvShowViewedSeasons),
            onChanged: {
              action: "sliderValueChanged",
              props: {

              }
            }
          },
          {
            type: "button",
            text: "Ajouter " + data.currentTvShowViewedSeasons + " saisons en vue",
            onPressed: {
              action: "addTvShowSeason",
              props: {
                tvshowid: data.currentMovieInfo.show.id,
                seasonNum: numberOfSeason,
                viewedSeason:numberOfViewedSeason,
                tvshowViewedTime: totalViewedTime,
                tvshowNotViewedTime: totalNotViewedTime,
              }
            }
          },
          {
            type: "button",
            text: "Retour",
            onPressed: {
              action: "switchHomeUi"
            }
          }
        ]
      },
      opaque: true
    }
  }
}