'use strict'

/**
 * the main view that display new movies/tv shows
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
  const functions = require("../../resources/functions");
  var datas = data[0].general;
  if (datas.currentMovieInfo.show != null) {
    datas.tvShowToSetupSeasons = datas.currentMovieInfo.show;
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
    type: "container",
    decoration: {
      color: datas.darkbg
    },
    child: {
      type: "flex",
      direction: "vertical",
      fillParent: true,
      crossAxisAlignment: "center",
      children: [
        {
          type: "widget",
          name: "homeWithOverlay",
        },
        {
          type: "widget",
          name: "menu",
          props: {
            page: "Main Page"
          },
          query: {
            "$find": {
              "_datastore": {
                "$eq": "appData"
              }
            }
          }
        },
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
                loadingPlaceholder: {
                  type: "image",
                  fit: "cover",
                  src: "https://www.burmunk.am/themes/burmunk/assets/no-product-image.png"
                },
                src: img
              },
              {
                type: "actionable",
                onPressed: {
                  action: "switchMovieInfoUi",
                  props: {
                    from: "home",
                    type: videoType,
                    movieData: videoInfo
                  }
                },
                onHovered: {
                  action: "movieInfoButtonHoverEvent"
                },
                child: {
                  type: "container",
                  decoration: {
                    color: datas.movieInfoButtonColor[0],
                  },
                  child: {
                    type: "flex",
                    children: [
                      {
                        type: "icon",
                        value: "info",
                        color: datas.movieInfoButtonColor[1],
                        size: 35
                      }
                    ]
                  }
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
          type: "container",
          child:
          {
            type: "flex",
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "center",
            fillParent: true,
            children: [
              {
                type: "widget",
                name: "bottomButton",
                props: {
                  videoType: videoType,
                  buttonIcon: "close",
                  buttonStr: "Pas vu",
                  color: datas.bottomButton3Color[0],
                  iconColor: datas.bottomButton3Color[1],
                  action: "bottomButtonClick",
                  movieDict: datas.currentMovie,
                  buttonName: "notviewed"
                }
              },
              {
                type: "widget",
                name: "bottomButton",
                props: {
                  videoType: videoType,
                  buttonIcon: "add",
                  buttonStr: "Intéressé",
                  color: datas.bottomButton2Color[0],
                  iconColor: datas.bottomButton2Color[1],
                  action: "bottomButtonClick",
                  movieDict: datas.currentMovie,
                  buttonName: "interested"
                }
              },
              {
                type: "widget",
                name: "bottomButton",
                props: {
                  videoType: videoType,
                  buttonIcon: "done",
                  buttonStr: "Vu",
                  color: datas.bottomButton1Color[0],
                  iconColor: datas.bottomButton1Color[1],
                  movie: datas.currentMovieInfo,
                  action: action,
                  buttonName: "viewed"
                }
              },
            ]
          }
        }
      ]
    }
  }
}