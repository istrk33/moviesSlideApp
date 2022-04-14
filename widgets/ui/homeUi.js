'use strict'
const axios = require('axios')

module.exports = async (data, props) => { 
  var img= "https://api.betaseries.com/pictures/movies?key=941cc48f228b&id="+data.currentMovie[0]+"&width=627&height=933";
  console.log(img);
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
                src: img
              },
              {
                type: "actionable",
                onPressed: {
                  action: "switchMovieInfoUi"
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
                  action: "NotViewed",
                  movieDict: data.currentMovie
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
                  action: "Interested",
                  movieDict: data.currentMovie
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
                  action: "Viewed",
                  movieDict: data.currentMovie
                }
              },
            ]
          }
        }
      ]
    }
  }
}