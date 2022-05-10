'use strict'

/**
 * view that display all interested movies/tv shows of the user
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
  var arr = Object.values(datas.userInterests);
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
        },
        {
          type: "widget",
          name: "menu",
          props: {
            page: "User Viewed"
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
                      minWidth: 200,
                      maxWidth: 200
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
                  if (datas.userInterests["tvshows_" + element[0]] != null || datas.userInterests["tvshows_" + element[0]] != undefined) {
                    var movieId = "tvshows_" + element[0];
                    var btnTxt = (element[4] == undefined) ? element[1] + ", de la S1" : element[1] + ", de la S" + element[4];
                    var action = "showOverlaySeason";
                  } else {
                    var movieId = element[0];
                    var btnTxt = element[1];
                    var action = "viewedMovieButton";
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
                          src: "interests",
                          movieId: movieId,
                          height: 50,
                          width: 200,
                          arrayData: datas.userInterests,
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
                        name: "listButton",
                        props: {
                          borderColor: 0xFFFA5656,
                          // tvShowUpdate: true,
                          src: "interests",
                          movieId: movieId,
                          iconValue: "delete",
                          iconColor: 0xFFFA5656,
                          action: "deleteViewedMovie",
                        }
                      },
                      {
                        type: "widget",
                        name: "listButton",
                        props: {
                          borderColor: 0xFF36CD6B,
                          tvShowUpdate: (datas.userViewed[movieId] != null || datas.userViewed[movieId] != undefined),
                          src: "interests",
                          movieId: movieId,
                          iconValue: "done",
                          iconColor: 0xFF36CD6B,
                          action: action,
                        },
                      }
                    ]
                  }
                }),
              ]
            }
          }
        }
      ]
    }
  }
}