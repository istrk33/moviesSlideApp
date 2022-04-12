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
          page: "User Viewed"
        }
      },
      {
        type: "flex",
        direction: "vertical",
        children: [
          ...data.userViewed.map(element => {
            return {
              type: "button",
              text: element
            }
          })
        ]
      }
    ]
  }
}