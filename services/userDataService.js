'use strict'

const { default: axios } = require("axios");

module.exports = {
    get(api, elementId) {
        return axios.get(`${api.url}/app/datastores/appData/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } }
        );
    },
    put(api, element) {
        return axios.put(`${api.url}/app/datastores/appData/data/${element._id}`, counter, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    new(api, element) {
        return axios.post(`${api.url}/app/datastores/appData/data`, { "general": element }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    delete(api, elementId) {
        return axios.delete(`${api.url}/app/datastores/appData/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } });

    },
    createDatastore(api) {
        return axios.post(`${api.url}/app/datastores`, { "name": "appData" }, { headers: { Authorization: `Bearer ${api.token}` } });
    }
}
