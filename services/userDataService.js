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
    deleteFromDatastore(api, elementId,datastoreName) {
        return axios.delete(`${api.url}/app/datastores/${datastoreName}/data/${elementId}`, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    getIdOfMovieDataByMovieId(api, movieId,datastoreName) {
        return axios.post(`${api.url}/app/query`, { "$find": { "_datastore": datastoreName, "data.0":  movieId } }, { headers: { Authorization: `Bearer ${api.token}` } }).then((response) => {
            return response.data.data[0]
        }).catch((e => {
            console.log("ERROR ");
            console.log(e);
        }));
    },
    put(api, name, id, data) {
        return axios.put(`${api.url}/app/datastores/${name}/data/${id}`, data, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    getDatastore(api, name) {
        return axios.post(`${api.url}/app/query`, { "$find": { "_datastore": { "$eq": name } } }, { headers: { Authorization: `Bearer ${api.token}` } }).catch((e => {
            console.log("ERROR ");
            console.log(e);
        }));
    },
    new(api, name, data) {
        return axios.post(`${api.url}/app/datastores/${name}/data`, { data: data }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
    createDatastore(api, name) {
        return axios.post(`${api.url}/app/datastores`, { "name": name }, { headers: { Authorization: `Bearer ${api.token}` } });
    },
}
