'use strict'

module.exports = (data, props) => {
  var arr = Object.values(data.userViewed);
  // console.log("ksdqjslfqksdj " + data.userViewed['34676']);
  // console.log(arr);
  return {
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
                  child:{
                    type:"text",
                    value:""
                  }
                }
              },
              ...arr.sort().map(element => {
                return {
                  type: "flex",
                  children: [
                    {
                      type: "widget",
                      name: "movieButton",
                      props: {
                        buttonText:element[1],
                        src:"viewed",
                        from: "other",
                        movieId: element[0],
                        height: 50,
                        width: 600,
                        array: data.userViewed,
                        viewWidget:[
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
                                color: 0xFFFA5656
                              },
                              child: {
                                type: "icon",
                                value:"delete",
                                color:0xFFFA5656
                              }
                            }
                            // onHovered: {
                            //   action:"",
                            //   props:{
      
                            //   }
                            // }
                          }

                        ]
                      }
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