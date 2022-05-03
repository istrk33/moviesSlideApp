'use strict'

module.exports = (data, props) => {
  var arr = Object.values(data.userViewed);
  return {
    type: "container",
    decoration: {
      color: data.darkbg
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
          }
        }
        ,
        {
          type: "container",
          padding: {
            top: 1,
            bottom: 1
          },
          child: {
            type: "textfield",
            value: "",
            label: "Rechercher",
            onChanged: {
              action: "searchTextChanged",
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
              color: data.darkbg
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
                  return (element[1].toLowerCase().includes(data.searchValue.toLowerCase()));
                }).map(element => {
                  if (data.userViewed["tvshows_" + element[0]] != null || data.userViewed["tvshows_" + element[0]] != undefined) {
                    var movieId = "tvshows_" + element[0];
                    var btnTxt=element[1]+", S"+element[4];
                  } else {
                    var movieId = element[0];
                    var btnTxt=element[1];
                  }
                  return {
                    type: "flex",
                    children: [
                      {
                        type: "widget",
                        name: "movieButton",
                        props: {
                          buttonText:btnTxt ,
                          src: "viewed",
                          from: "other",
                          movieId: movieId,
                          height: 50,
                          width: 250,
                          arrayData: data.userViewed,
                          // viewWidget: [
                          // ]
                        }
                      },
                      {
                        type: "actionable",
                        onPressed: {
                          action: "deleteViewedMovie",
                          props: {
                            movieIdToRemove: movieId,
                            src: "viewed"
                          }
                        },
                        child: {
                          type: "container",
                          decoration: {
                            color: data.darkbg
                          },
                          border: {
                            top: {
                              width: 1,
                              color: 0xFFFA5656
                            },
                            bottom: {
                              width: 1,
                              color: 0xFFFA5656
                            },
                            right: {
                              width: 1,
                              color: 0xFFFA5656
                            },
                            left: {
                              width: 1,
                              color: 0xFFFA5656
                            }
                          },
                          child: {
                            type: "icon",
                            value: "delete",
                            color: 0xFFFA5656,
                            size: 51
                          }
                        }
                        // onHovered: {
                        //   action:"",
                        //   props:{

                        //   }
                        // }
                      },
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