'use strict'
const axios = require('axios')

module.exports = async (data, props) => {
  var img = "https://api.betaseries.com/pictures/movies?key=941cc48f228b&id=" + data.currentMovie[0] + "&width=627&height=933";

  var h = Math.floor(data.currentMovieInfo.movie.length / 3600);
  var m = Math.floor(data.currentMovieInfo.movie.length % 3600 / 60);
  var s = Math.floor(data.currentMovieInfo.movie.length % 3600 % 60);

  if (h.toString().length < 2) {
    h = "0" + h;
  }
  if (s.toString().length < 2) {
    s = "0" + s;
  }
  if (m.toString().length < 2) {
    m = "0" + m;
  }
  var currentFilmDurationStr = h + ":" + m + ":" + s;
  return {
    type: "container",
    decoration: {
      color: 0xFF212121
    },
    child: {
      type: "flex",
      direction: "vertical",
      fillParent: true,
      crossAxisAlignment: "center",
      children: [
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
              //image du film courant
              {
                type: "image",
                fit: "cover",
                loadingPlaceholder: {
                  type: "image",
                  fit: "cover",
                  src: "https://www.burmunk.am/themes/burmunk/assets/no-product-image.png"
                },
                framePlaceholder: {
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
                    from:"home",
                    movieData: data.currentMovieInfo.movie
                  }
                },
                onHovered: {
                  action: "movieInfoButtonHoverEvent"
                },
                child: {
                  type: "container",
                  decoration: {
                    color: data.movieInfoButtonColor[0],
                    // borderRadius: {
                    //   bottomLeft:
                    //   {
                    //     x: 30,
                    //     y: 30
                    //   },
                    //   bottomRight: {
                    //     x: 30,
                    //     y: 30
                    //   },
                    //   topLeft: {
                    //     x: 30,
                    //     y: 30
                    //   },
                    //   topRight: {
                    //     x: 30,
                    //     y: 30
                    //   },
                    // }
                  },
                  child: {
                    type: "flex",
                    children: [
                      {
                        type: "icon",
                        value: "info",
                        color: data.movieInfoButtonColor[1],
                        size: 35
                      },
                      // {
                      //   type: "container",
                      //   padding: {
                      //     top: 1
                      //   },
                      //   child: {
                      //     type: "text",
                      //     value: "Voir les détails"
                      //   }
                      // }
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
          // constraints:{
          //   // minHeight:20,
          //   maxWidth:2100,
          // },
          child: {
            type: "flex",
            direction: "vertical",
            // fillParent: true,
            crossAxisAlignment: "center",
            mainAxisAlignment: "center",
            spacing: 1,
            children: [
              {
                type: "text",
                value: String(data.currentMovie[1]),
                style: {
                  color: 0xFFFFFFFF,
                  fontSize: 20
                }
              },
              {
                type: "text",
                value: String(currentFilmDurationStr + " | " + data.currentMovie[2]),
                style: {
                  color: 0xFFFFFFFF,
                  fontSize: 15
                }
              },
              {
                type: "text",
                value: String( data.currentMovieInfo.movie.director),
                style: {
                  color: 0xFFFFFFFF,
                  fontSize: 15
                }
              }
            ]
          }
        }
        , {
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
                  buttonIcon: "done",
                  buttonStr: "Vu",
                  color: data.bottomButton1Color[0],
                  iconColor: data.bottomButton1Color[1],
                  action: "bottomButtonClick",
                  movieDict: data.currentMovie,
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