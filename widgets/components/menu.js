
const User = require('../../classes/User.js');
const userService = require('../../services/userService.js');

function menu(data, props) {
    const children = [{
        type: "widget",
        name: "ariane",
        query: {
            "$find": {
                "_datastore": userService.datastoreName,
                "_id": "@me"
            }
        }
    }];
    if (props && props.mainAction) {
        children.push({
            ...props.mainAction,
            type: "button"
        });
    }
    return {
        type: "container",
        decoration: {
            color: 0xFFFFFFFF,
            boxShadow: {
                blurRadius: 8,
                color: 0x1A000000,
                offset: {
                    dx: 0,
                    dy: 1
                }
            },
        },
        child: {
            type: "flex",
            fillParent: true,
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "center",
            padding: ui.padding.symmetric(4, 2),
            children
        }
    }
}

module.exports = {
    menu
}