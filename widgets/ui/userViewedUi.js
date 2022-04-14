'use strict'

module.exports = (data, props) => {
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
        fit:"tight",
        child:
        {
          type: "flex",
          direction: "vertical",
          // fillParent: true,
          scroll: true,
          children: [
            ...data.userViewed.map(element => {
              return {
                type: "widget",
                name: "movieButton",
                props: {
                  buttonText: element
                }
              }
            })
          ]
        }
      }
    ]
  }
}