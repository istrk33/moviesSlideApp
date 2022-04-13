'use strict'

module.exports = (data, props) => {
  return {
    type: "container",
    decoration: {
      color: 0xFF686868
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
                src: "https://imgsrc.cineserie.com/2022/02/doctor-strange-in-the-multiverse-of-madness-affiche-1418131.png?ver=1"
              }, {
                type: "actionable",
                onPressed: {
                  action: "switchMovieInfoUi"
                },
                child: {
                  type: "container",
                  child: {
                    type: "flex",
                    children: [
                      {
                        type: "icon",
                        value: "info",
                        size: 20
                      },
                      {
                        type: "container",
                        padding: {
                          top: 1
                        },
                        child: {
                          type: "text",
                          value: "Voir les détails"
                        }
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
                  iconColor: data.bottomButton3Color[1]
                }
              },
              {
                type: "widget",
                name: "bottomButton",
                props: {
                  buttonIcon: "add",
                  buttonStr: "Intéressé",
                  color: data.bottomButton2Color[0],
                  iconColor: data.bottomButton2Color[1]
                }
              },
              {
                type: "widget",
                name: "bottomButton",
                props: {
                  buttonIcon: "done",
                  buttonStr: "Vu",
                  color: data.bottomButton1Color[0],
                  iconColor: data.bottomButton1Color[1]
                }
              },
            ]
          }
        }
      ]
    }
  }
}