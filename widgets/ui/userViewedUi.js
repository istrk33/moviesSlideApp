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
              // fillParent: true,
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
                ...arr.sort().map(element => {
                  if (data.userInterests["tvshows_" + element[0]] != null || data.userInterests["tvshows_" + element[0]] != undefined) {
                    var movieId = "tvshows_" + element[0];
                  } else {
                    var movieId = element[0];
                  }
                  return {
                    // type: "flex",
                    // children: [
                    // {
                    //   type: "widget",
                    //   name: "movieButton",
                    //   props: {
                    //     buttonText: element[1],
                    //     src: "viewed",
                    //     from: "other",
                    //     movieId: element[0],
                    //     height: 50,
                    //     width: 600,
                    //     array: data.userViewed,
                    //     viewWidget: [
                    //       {
                    //         type: "actionable",
                    //         onPressed: {
                    //           action: "deleteViewedMovie",
                    //           props: {
                    //             movieIdToRemove: element[0],
                    //             src: "interests"
                    //           }
                    //         },
                    //         child: {
                    //           type: "container",
                    //           decoration: {
                    //             color: 0xFFFA5656
                    //           },
                    //           child: {
                    //             type: "icon",
                    //             value: "delete",
                    //             color: 0xFFFA5656
                    //           }
                    //         }
                    //         // onHovered: {
                    //         //   action:"",
                    //         //   props:{

                    //         //   }
                    //         // }
                    //       }


                    //     ]
                    //   }
                    // },

                    //   ]
                    type: "flex",
                    // fillParent: true,
                    children: [
                      {
                        type: "widget",
                        name: "movieButton",
                        props: {
                          buttonText: element[1],
                          src: "viewed",
                          from: "other",
                          movieId: element[0],
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
                            movieIdToRemove: element[0],
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
                })
              ]
            }
          }
        }
      ]
    }
  }
}