'use strict'

/**
 * view that display all viewed tv shows, movies of the user
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
  var datas = data[0].data;
  return {
    type: "container",
    decoration: {
      color: datas.darkbg
    },
    child: {
      type: "flex",
      direction: "vertical",
      crossAxisAlignment: "center",
      children: [
        {
          type: "widget",
          name: "menu",
          props: {
            page: "User Viewed"
          },
          query: {
            "$find": {
              "_datastore": {
                "$eq": "vars"
              }
            }
          }
        },
        {
          type: "widget",
          name: "textfield",
          query: {
            "$find": {
              "_datastore": {
                "$eq": "vars"
              }
            }
          }
        },
        {
          type: "flexible",
          fit: "tight",
          child:
          {
            type: "container",
            decoration: {
              color: datas.darkbg
            },
            child: {
              type: "flex",
              direction: "vertical",
              crossAxisAlignment: "center",
              mainAxisAlignment: "center",
              scroll: true,
              children: [
                // {
                //   type:"widget",
                //   name:"viewedListWidget",
                //   query: {
                //     "$find": {
                //         "_datastore": {
                //             "$eq": "userViewed"
                //         }
                //     }
                // }
                // }
              ]
            }
          }
        }
      ]
    }
  }
}