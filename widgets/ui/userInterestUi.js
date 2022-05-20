'use strict'

/**
 * view that display all interested movies/tv shows of the user
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
  console.log("////////////////////////////////////////////////////////////USER INTERESTS///////////////////////////////////////////////////////////////////");
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
          name: "homeWithOverlay",
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
          name: "menu",
          props: {
            page: "User Viewed"
          }, query: {
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
                //   type: "widget",
                //   name: "interestListWidget",
                //   query: {
                //     "$find": {
                //       "_datastore": {
                //         "$eq": "userInterests"
                //       }
                //     }
                //   },
                //   props: {
                //     searchValue: datas.searchValue
                //   }
                // }
              ]
            }
          }
        }
      ]
    }
  }
}