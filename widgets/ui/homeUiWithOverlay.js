'use strict'

module.exports = async (data, props) => {
  const functions = require("../../resources/functions");
  if (data.tvShowIdToSetupSeasons == -1) {
    var numberOfSeasonViewed = Math.floor(data.overlaySliderValue);
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
    var returnAction = "switchHomeUi";
    var val = data.currentTvShowViewedSeasons;
  } else {
    var returnAction = "switchInterestUi";
    var numberOfSeasonViewed = Math.floor(data.overlaySliderValue);
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
    // var val = data.userViewed["tvshows_" + data.tvShowIdToSetupSeasons][4];
  }
  // if (data.currentTvShowViewedSeasons != 1)
  //   data.overlaySliderValue = data.currentTvShowViewedSeasons;
  // var onlyOneSeason = ;

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
            value: "Nombre de saisons vues " + data.overlaySliderValue + "/" + tvshow.seasons + "\n Équivalent à " + functions.computeMenuTime(totalViewedTime),
            style: {
              color: 0xFFFFFFFF
            }
          },

          ...(tvshow.seasons > 1) ? [
            {
              type: "slider",
              label: "" + data.overlaySliderValue,
              min: 1,
              divisions: parseInt(tvshow.seasons) - 1,
              max: parseInt(tvshow.seasons),
              autofocus: true,
              value: data.overlaySliderValue,
              onChanged: {
                action: "sliderValueChanged",
                props: {
                  alreadyChanged: true
                }
              }
            }
          ] : []
          ,
          {
            type: "button",
            text: "Ajouter " + data.overlaySliderValue + " saisons en vue",
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
              action: returnAction
            }
          }
        ]
      },
      opaque: true
    }
  }
}