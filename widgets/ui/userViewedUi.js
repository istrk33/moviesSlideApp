'use strict'

module.exports = (data, props) => {
  var arr = Object.values(data.userViewed);
  return {
    type: "flex",
    direction: "vertical",
    crossAxisAlignment: "center",
    children: [
      {
        type: "widget",
        name: "menu",
        props: {
          page: "User Viewed"
        }
      },
      {
        type: "flexible",
        fit: "tight",
        child:
        {
          type: "flex",
          direction: "vertical",
          // fillParent: true,
          scroll: true,
          children: [
            ...arr.sort().map(element => {
              return {
                type: "widget",
                name: "movieButton",
                props: {
                  buttonText: element[1],
                  from:"other",
                  movieId: element[0]
                }
              }
            })
          ]
        }
      }
    ]
  }
}