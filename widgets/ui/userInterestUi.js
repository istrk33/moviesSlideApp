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
          page: "User Interest"
        }
      },
      {
        type: "flex",
        direction: "vertical",
        children: [
          ...data.userInterests.map(element => {
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