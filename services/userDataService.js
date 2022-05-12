'use strict'

const { default: axios } = require("axios");

module.exports = {
    // get(api, elementId) {
    //     return axios.get(`${api.url}/app/datastores/general/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } }
    //     );
    // },


    // put(api, id, element) {
    //     return axios.put(`${api.url}/app/datastores/general/data/${id}`, element, { headers: { Authorization: `Bearer ${api.token}` } });
    // },


    // delete(api, elementId) {
    //     return axios.delete(`${api.url}/app/datastores/general/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } });
    // },

    getGeneral(api) {
        return axios.post(`${api.url}/app/query`, { "$find": { "_datastore": { "$eq": "general" } } }, { headers: { Authorization: `Bearer ${api.token}` } });
    },

    new(api, name, data) {
        return axios.post(`${api.url}/app/datastores/${name}/data`, { element: data }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    createDatastore(api, name) {
        return axios.post(`${api.url}/app/datastores`, { "name": name }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
}
