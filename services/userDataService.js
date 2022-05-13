'use strict'

const { default: axios } = require("axios");

module.exports = {
    // get(api, elementId) {
    //     return axios.get(`${api.url}/app/datastores/general/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } }
    //     );
    // },
    // delete(api, elementId) {
    //     return axios.delete(`${api.url}/app/datastores/general/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } });
    // },
    put(api, name, id, element) {
        return axios.put(`${api.url}/app/datastores/${name}/data/${id}`, element, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    getDatastore(api, name) {
        return axios.post(`${api.url}/app/query`, { "$find": { "_datastore": { "$eq": name } } }, { headers: { Authorization: `Bearer ${api.token}` } }).catch((e => {
            console.log("ERROR ");
            console.log(e);
        }));
    },
    new(api, name,data) {
        return axios.post(`${api.url}/app/datastores/${name}/data`, {  data: data }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    createDatastore(api, name) {
        return axios.post(`${api.url}/app/datastores`, { "name": name }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
}
