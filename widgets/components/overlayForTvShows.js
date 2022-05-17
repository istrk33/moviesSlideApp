'use strict'

/**
 * view that display the slider to the user to choose his last viewed season on the concerned tv show
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
const functions = require("../../resources/functions");
module.exports = async (data, props) => {
  if (data[0].data !== undefined || data[0].data != null) {
    var datas = data[0].data;
  } else {
    var datas = data[0];
  }
  var numberOfSeasonViewed = Math.floor(datas.overlaySliderValue);
  var numberOfViewedEpisode = 0;
  var numberOfNotViewedEpisode = 0;
  if (datas.overlayState) {
    if (datas.tvShowIdToSetupSeasons == -1) {
      var tvshow = datas.currentMovieInfo.show;
      tvshow.seasons_details.forEach(element => {
        (parseInt(element.number) <= numberOfSeasonViewed) ? numberOfViewedEpisode += parseInt(element.episodes) : numberOfNotViewedEpisode += parseInt(element.episodes);
      });
    } else {
      var tvshow = (await functions.getTvShowDetails(datas.apiKey, datas.tvShowIdToSetupSeasons)).show;
      tvshow.seasons_details.forEach(element => {
        (parseInt(element.number) <= numberOfSeasonViewed) ? numberOfViewedEpisode += parseInt(element.episodes) : numberOfNotViewedEpisode += parseInt(element.episodes);
      });
    }
    var totalViewedTime = numberOfViewedEpisode * tvshow.length * 60;
    var totalNotViewedTime = numberOfNotViewedEpisode * tvshow.length * 60;
  }
  return {
    type: "overlayEntry",
    showOverlay: datas.overlayState,
    child: (datas.overlayState) ? {
      type: "container",
      decoration: {
        color: 0xAC000000
      },
      child: {
        type: "flex",
        direction: "vertical",
        mainAxisAlignment: "center",
        crossAxisAlignment: "center",
        children: [
          {
            type: "text",
            value: "Nombre de saisons vues " + datas.overlaySliderValue + "/" + tvshow.seasons + "\n Équivalent à " + functions.computeMenuTime(totalViewedTime),
            style: {
              color: 0xFFFFFFFF
            }
          },
          ...(tvshow.seasons > 1) ? [
            {
              type: "slider",
              label: "" + datas.overlaySliderValue,
              min: 1,
              divisions: parseInt(tvshow.seasons) - 1,
              max: parseInt(tvshow.seasons),
              autofocus: true,
              value: datas.overlaySliderValue,
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
            text: "Ajouter " + datas.overlaySliderValue + " saisons en vue",
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
              action: "hideOverlay"
            }
          }
        ]
      }
    } : {
      type: "text",
      value: "not defined"
    },
    // opaque: true
  }
}