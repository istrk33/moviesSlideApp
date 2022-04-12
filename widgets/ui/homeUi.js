'use strict'

module.exports = (data, props) => {
  return {
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
              type: "flex",
              // crossAxisAlignment: "center",
              // fillParent: true,
              children: [
                {
                  type: "image",
                  fit: "fitHeight",
                  src: "https://imgsrc.cineserie.com/2022/02/doctor-strange-in-the-multiverse-of-madness-affiche-1418131.png?ver=1"
                }]
            },
            {
              type: "button",
              text: "Voir les détails",
              size: "small",
              rightIcon:
              {
                type: "icon",
                value: "details",
                size: 20
              },
              onPressed: {
                action: "switchMovieInfoUi"
              }
            }
          ]
        }
      },
      {
        type: "flex",
        mainAxisAlignment: "spaceBetween",
        crossAxisAlignment: "center",
        padding: {
          left: 4,
          right: 4,
          top: 2,
          bottom: 2
        },
        children: [
          {
            type: 'button',
            text: "Pas vu",
            size: "large",
            mainStyle: "tertiary",
            leftIcon:
            {
              type: "icon",
              value: "close",
              size: 20
            },
            onPressed: {
              action: "NotViewed"
            }
          },
          {
            type: 'button',
            text: "Intéressé",
            size: "large",
            mainStyle: "tertiary",
            leftIcon:
            {
              type: "icon",
              value: "add",
              size: 20
            },
            onPressed: {
              action: "Interested"
            }
          },
          {
            type: 'button',
            text: "Vu",
            size: "large",
            mainStyle: "tertiary",
            leftIcon:
            {
              type: "icon",
              value: "done",
              size: 20
            },
            onPressed: {
              action: "Viewed"
            }
          },
        ]
      }
    ]
  }
}

