'use strict'

module.exports = (data, props) => {
  var arr = Object.values(data.userInterests);
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
                ...arr.sort().map(element => {
                  return {
                    type: "flex",
                    // fillParent: true,
                    children: [
                      {
                        type: "widget",
                        name: "movieButton",
                        props: {
                          buttonText: element[1],
                          src: "interests",
                          from: "other",
                          movieId: element[0],
                          height: 50,
                          width: 200,
                          array: data.userInterests,
                          // viewWidget: [
                          // ]
                        }
                      },
                      {
                        type: "actionable",
                        onPressed: {
                          action: "deleteViewedMovie",
                          props: {
                            movieIdToRemove: element[0],
                            src: "interests"
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
                            size: 49
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
                          action: "viewedMovieButton",
                          props: {
                            viewedMovieId: element[0],
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
                            size: 49
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