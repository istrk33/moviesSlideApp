'use strict'

/**
 * hiding overlay
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
const functions = require("../../resources/functions");
module.exports = async (_props, event, api) => {
    var list = [];
    var consts = (await service.getDatastore(api, "consts")).data.data[0];
    // datastore pour variables
    var listOfUndiscoveredMovies = {};
    var movieInfoToSee = null;
    var start = 0;

    // boucle for pour ajouter chacune des séries films depuis l'api de films vers l'api de données lenra
    console.log("TESSSSSSSSSSSTTTT11111");
    // (await functions.queryPopularMovies(consts.data.apiKey, start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
    (await functions.queryPopularTvShows(consts.data.apiKey, start)).forEach((element) => listOfUndiscoveredMovies["tvshows_" + element.id] = ["tvshows_" + element.id, element.title]);
    console.log("TESSSSSSSSSSSTTTT22222");

    var mixedArray = Object.values(listOfUndiscoveredMovies).sort((a, b) => 0.5 - Math.random());
    console.log(mixedArray);
    await Promise.all(mixedArray.map((element) => {
        console.log(element);
        // envoyer tableau
        return service.new(api, "listOfUndiscoveredMovies", element[0], element[1]).then(function (response) {
            response.data;
        }).catch((e => {
            list.push(e);
            console.log("ERROR " + e);
        }));
    }
    ));
    start += 5;
    console.log("TESSSSSSSSSSSTTTT3");

    var listOfUndiscoveredMoviesFromApi = (await service.getDatastore(api, "listOfUndiscoveredMovies"));
    console.log("TESSSSSSSSSSSTTTT4");
    console.log("listOfUndiscoveredMoviesFromApi.data");
    console.log(listOfUndiscoveredMoviesFromApi.data);
    console.log("listOfUndiscoveredMoviesFromApi.data.data");
    console.log(listOfUndiscoveredMoviesFromApi.data.data);
    console.log("listOfUndiscoveredMoviesFromApi.data.data[0].id");
    console.log(listOfUndiscoveredMoviesFromApi.data.data[0].id);
    var currentId = listOfUndiscoveredMoviesFromApi.data.data[0].id;
    var currentMovieInfo = (String(currentId).includes("tvshows_")) ? (await functions.getTvShowDetails(consts.data.apiKey, String(currentId).substring(8))) : (await functions.getMovieDetails(consts.data.apiKey, currentId));
    console.log(currentMovieInfo);
    console.log("TESSSSSSSSSSSTTTT5");
    var variables = {
        totalWastedTime: 0,
        totalSavedTime: 0,
        potentialWasteTime: 0,
        menuTimeLabel: "tempsPerdu",
        searchValue: "",
        tvShowIdToSetupSeasons: -1,
        currentTvShowViewedSeasons: 1,
        overlaySliderValue: 1,
        start,
        overlayState: false,
        currentMovieInfo,
        movieInfoToSee,
        currentId,
        movieInfoButtonColor: [0xF4212121, 0xFFFFFFFF],
        bottomButtonsColors: [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]],
        dropDownDefaultButtonColor: 0xFF1E232C,
        white: 0xFFFFFFFF,
        black: 0xFF000000,
        darkbg: 0xFF212121,
        hoverMenuButtonColor: 0xFFB5B5B5,
    }
    await service.new(api, "vars", "dict", variables).then(function (response) {
        response.data
    }).catch((e => { list.push(e); console.log("ERROR " + e); }));
    console.log("TESSSSSSSSSSSTTTT6");

    consts.data.navigation = "home";
    // envoyer tableau
    await service.put(api, "consts", consts._id, consts).then(function (response) {
        response.data
    }).catch((e => { list.push(e); console.log("ERROR " + e); }));
    console.log("TESSSSSSSSSSSTTTT777");

    console.log("\n\n\n\nINITIAL DATA ADDED\n\n\n");
    return list;
}