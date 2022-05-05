'use strict'

/**
 * the main view that display new movies/tv shows
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
  const functions = require("../../resources/functions");
  if (data.currentMovieInfo.show != null) {
    data.tvShowToSetupSeasons = data.currentMovieInfo.show;
    var numberOfSeason = data.currentMovieInfo.show.seasons;
    var currentFilmDurationStr = (numberOfSeason == 1) ? numberOfSeason + " saison" : numberOfSeason + " saisons";
    var img = "https://api.betaseries.com/pictures/shows?key=" + data.apiKey + "&id=" + data.currentMovieInfo.show.id + "&width=627&height=933";
    var director = (data.currentMovieInfo.show.showrunner == null) ? "Inconnu" : data.currentMovieInfo.show.showrunner.name;
    var videoType = "tvshow";
    var title = data.currentMovieInfo.show.title;
    var year = data.currentMovieInfo.show.creation;
    var videoInfo = data.currentMovieInfo.show;
    var action = "showOverlaySeason";
  } else {
    var img = "https://api.betaseries.com/pictures/movies?key=" + data.apiKey + "&id=" + data.currentMovieInfo.movie.id + "&width=627&height=933";
    var currentFilmDurationStr = functions.computeMovieDuration(data.currentMovieInfo.movie.length);
    var director = data.currentMovieInfo.movie.director;
    var videoType = "movie";
    var title = data.currentMovieInfo.movie.title;
    var year = data.currentMovieInfo.movie.production_year;
    var videoInfo = data.currentMovieInfo.movie;
    var action = "bottomButtonClick";
  }

  return {
    type: "container",
    decoration: {
      color: data.darkbg
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
                    color: data.movieInfoButtonColor[0],
                  },
                  child: {
                    type: "flex",
                    children: [
                      {
                        type: "icon",
                        value: "info",
                        color: data.movieInfoButtonColor[1],
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
                  color: data.bottomButton3Color[0],
                  iconColor: data.bottomButton3Color[1],
                  action: "bottomButtonClick",
                  movieDict: data.currentMovie,
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
                  color: data.bottomButton2Color[0],
                  iconColor: data.bottomButton2Color[1],
                  action: "bottomButtonClick",
                  movieDict: data.currentMovie,
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
                  color: data.bottomButton1Color[0],
                  iconColor: data.bottomButton1Color[1],
                  movie: data.currentMovieInfo,
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