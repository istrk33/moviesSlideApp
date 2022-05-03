'use strict'

module.exports = (data, props) => {
  var arr = Object.values(data.userInterests);
  data.searchValue = "";
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
        },
        {
          type: "flex",
          direction: "vertical",
          children: [
            {
              type: "container",
              padding: {
                top: 1,
                bottom: 1
              },
              // constraints:{
              //   minHeight:50,
              //   minWidth:200
              // },
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
              type: "text",
              value: data.searchValue,
              style: {
                color: data.white
              }
            }
          ]
        }
        , {
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
                  return (element[1].toLowerCase().includes(data.searchValue.toLowerCase()));
                }).map(element => {
                  if (data.userInterests["tvshows_" + element[0]] != null || data.userInterests["tvshows_" + element[0]] != undefined) {
                    var movieId = "tvshows_" + element[0];
                    var btnTxt = element[1] + ", de la S" + element[4];
                    var action = "showOverlaySeason";
                  //  data.currentTvShowViewedSeasons = data.userViewed[movieId][4];
                  } else {
                    var movieId = element[0];
                    var btnTxt = element[1];
                    var action = "viewedMovieButton";
                  }
                  return {
                    type: "flex",
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
                          arrayData: data.userInterests,

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
                            src: "interests",
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
                      {
                        type: "actionable",
                        onPressed: {
                          action: action,
                          props: {
                            viewedMovieId: movieId,
                            tvShowUpdate: true,
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
                              color: 0xFF36CD6B
                            },
                            bottom: {
                              width: 1,
                              color: 0xFF36CD6B
                            },
                            right: {
                              width: 1,
                              color: 0xFF36CD6B
                            },
                            left: {
                              width: 1,
                              color: 0xFF36CD6B
                            }
                          }
                          , child: {
                            type: "icon",
                            value: "done",
                            color: 0xFF36CD6B,
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
                }),
              ]
            }
          }
        }
      ]
    }
  }
}