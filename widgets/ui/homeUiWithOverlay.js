'use strict'

module.exports = async (data, props) => {
  const functions = require("../../resources/functions");
  if (data.tvShowIdToSetupSeasons == -1) {
    var numberOfSeasonViewed = Math.floor(data.currentTvShowViewedSeasons);
    var numberOfViewedEpisode = 0;
    var numberOfNotViewedEpisode = 0;
    var tvshow = data.currentMovieInfo.show;
    //utiliser props
    tvshow.seasons_details.forEach(element => {
      if (parseInt(element.number) <= numberOfSeasonViewed) {
        numberOfViewedEpisode += parseInt(element.episodes);
      } else {
        numberOfNotViewedEpisode += parseInt(element.episodes);
      }
    });

    //utiliser props
    var totalViewedTime = numberOfViewedEpisode * tvshow.length * 60;
    var totalNotViewedTime = numberOfNotViewedEpisode * tvshow.length * 60;
  } else {
    var numberOfSeasonViewed = Math.floor(data.currentTvShowViewedSeasons);
    var numberOfViewedEpisode = 0;
    var numberOfNotViewedEpisode = 0;
    var tvshow = (await functions.getTvShowDetails(data.apiKey, data.tvShowIdToSetupSeasons)).show;
    //utiliser props
    tvshow.seasons_details.forEach(element => {
      if (parseInt(element.number) <= numberOfSeasonViewed) {
        numberOfViewedEpisode += parseInt(element.episodes);
      } else {
        numberOfNotViewedEpisode += parseInt(element.episodes);
      }
    });

    //utiliser props
    var totalViewedTime = numberOfViewedEpisode * tvshow.length * 60;
    var totalNotViewedTime = numberOfNotViewedEpisode * tvshow.length * 60;
  }

  return {
    type: "container",
    decoration: {
      color: data.darkbg
    },
    child: {
      type: "overlayEntry",
      showOverlay: true,
      child: {
        type: "flex",
        direction: "vertical",
        mainAxisAlignment: "center",
        crossAxisAlignment: "center",
        children: [
          {
            type: "text",
            value: "Nombre de saisons vues " + data.currentTvShowViewedSeasons + "/" + tvshow.seasons + "\n Équivalent à " + functions.computeMenuTime(totalViewedTime),
            style: {
              color: 0xFFFFFFFF
            }
          },
          {
            type: "slider",
            label: "" + data.currentTvShowViewedSeasons,
            min: 1,
            divisions: parseInt(tvshow.seasons) - 1,
            max: parseInt(tvshow.seasons),
            autofocus: true,
            // max: parseInt(5),
            // value:data.currentTvShowViewedSeasons,
            value: parseInt(data.currentTvShowViewedSeasons),
            onChanged: {
              action: "sliderValueChanged",
              props:{alreadyChanged:true}
            }
          },
          {
            type: "button",
            text: "Ajouter " + data.currentTvShowViewedSeasons + " saisons en vue",
            onPressed: {
              action: "addTvShowSeason",
              props: {
                tvshowid: tvshow.id,
                seasonNum: numberOfSeasonViewed,
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