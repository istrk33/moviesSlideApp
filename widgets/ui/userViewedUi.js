'use strict'

/**
 * view that display all viewed tv shows, movies of the user
 * @param {*} data 
 * @param {*} props 
 * @returns 
 */
module.exports = (data, props) => {
  if (data[0].element !== undefined || data[0].element != null) {
    var datas = data[0].element;
  } else {
    var datas = data[0];
  }
  // var datas = data[0].general;
  var arr = Object.values(datas.userViewed);
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
                "$eq": "general"
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
                "$eq": "general"
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
                {
                  type: "actionable",
                  child: {
                    type: "container",
                    constraints: {
                      minHeight: 0.1,
                      maxHeight: 0.1,
                      minWidth: 600,
                      maxWidth: 600
                    },
                    child: {
                      type: "text",
                      value: ""
                    }
                  }
                },
                ...arr.sort(function (a, b) {
                  if (a[1] < b[1]) {
                    return -1;
                  } else {
                    return 1;
                  };
                }).filter(function (element) {
                  return (element[1].toLowerCase().includes(datas.searchValue.toLowerCase()));
                }).map(element => {
                  if (datas.userViewed["tvshows_" + element[0]] != null || datas.userViewed["tvshows_" + element[0]] != undefined) {
                    var movieId = "tvshows_" + element[0];
                    var btnTxt = element[1] + ", S" + element[4];
                  } else {
                    var movieId = element[0];
                    var btnTxt = element[1];
                  }
                  return {
                    type: "flex",
                    mainAxisAlignment: "center",
                    crossAxisAlignment: "center",
                    padding: {
                      top: 1.5,
                      bottom: 1.5
                    },
                    children: [
                      {
                        type: "widget",
                        name: "movieButton",
                        props: {
                          buttonText: btnTxt,
                          src: "viewed",
                          from: "other",
                          movieId: movieId,
                          height: 50,
                          width: 250,
                          arrayData: datas.userViewed,
                          // viewWidget: [
                          // ]
                        }, query: {
                          "$find": {
                            "_datastore": {
                              "$eq": "general"
                            }
                          }
                        }
                      },
                      {
                        type: "widget",
                        name: "listButton",
                        props: {
                          borderColor: 0xFFFA5656,
                          src: "viewed",
                          movieId: movieId,
                          iconValue: "delete",
                          iconColor: 0xFFFA5656,
                          action: "deleteViewedMovie",
                        }
                      }
                    ]
                  }
                })
              ]
            }
          }
        }
      ]
    }
  }
}