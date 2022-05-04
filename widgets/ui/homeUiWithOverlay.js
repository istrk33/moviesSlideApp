'use strict'

/**
 * view that display the slider to the user to choose his last viewed season on the concerned tv show
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = async (data, props) => {
  const functions = require("../../resources/functions");
  var numberOfSeasonViewed = Math.floor(data.overlaySliderValue);
  var numberOfViewedEpisode = 0;
  var numberOfNotViewedEpisode = 0;
  if (data.tvShowIdToSetupSeasons == -1) {
    var tvshow = data.currentMovieInfo.show;
    tvshow.seasons_details.forEach(element => {
      (parseInt(element.number) <= numberOfSeasonViewed) ? numberOfViewedEpisode += parseInt(element.episodes) : numberOfNotViewedEpisode += parseInt(element.episodes);
    });
    var returnAction = "switchHomeUi";
  } else {
    var tvshow = (await functions.getTvShowDetails(data.apiKey, data.tvShowIdToSetupSeasons)).show;
    tvshow.seasons_details.forEach(element => {
      (parseInt(element.number) <= numberOfSeasonViewed) ? numberOfViewedEpisode += parseInt(element.episodes) : numberOfNotViewedEpisode += parseInt(element.episodes);
    });
    var returnAction = "switchInterestUi";
  }
  var totalViewedTime = numberOfViewedEpisode * tvshow.length * 60;
  var totalNotViewedTime = numberOfNotViewedEpisode * tvshow.length * 60;
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
                movieId: tvshow.id,
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