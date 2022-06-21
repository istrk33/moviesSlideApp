// faire user viewed et user interest sur la meme vue
const consts = require("../../services/local/appConstsService");
module.exports = (data, props) => {
  var datas = data[0].data;
  return {
    type: "container",
    decoration: {
      color: consts.darkbg
    },
    child: {
      type: "flex",
      direction: "vertical",
      crossAxisAlignment: "center",
      children: [
        // {
        //   type: "widget",
        //   name: "homeWithOverlay",
        //   query: {
        //     "$find": {
        //       "_datastore": {
        //         "$eq": "vars"
        //       }
        //     }
        //   }
        // },
        {
          type: "widget",
          name: "menu",
          props: {
            page: "User Viewed"
          }
        },
        {
          type: "widget",
          name: "textfield",
        },
        {
          type: "flexible",
          fit: "tight",
          child:
          {
            type: "container",
            decoration: {
              color: consts.darkbg
            },
            child: {
              type: "flex",
              direction: "vertical",
              crossAxisAlignment: "center",
              mainAxisAlignment: "center",
              scroll: true,
              children: [
                {
                  type: "widget",
                  name: "interestListWidget",
                  // query: {
                  //   "$find": {
                  //     "_datastore": {
                  //       "$eq": "userInterests"
                  //     }
                  //   }
                  // },
                  props: {
                    searchValue: datas.searchValue
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}