'use strict'

/**
 * changing the value of the search for the filter into the list views
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
module.exports = (data, _props, event) => {
    data.searchValue=event.value;
    return data
}