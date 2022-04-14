'use strict'

module.exports = (data, props) => {
  return {
    type: "flex",
    direction: "vertical",
    fillParent: true,
    scroll: true,
    children: [
      {
        type: "widget",
        name: "menu",
        props: {
          page: "User Interest"
        }
      }
      ,
      ...data.userInterests.map(element => {
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