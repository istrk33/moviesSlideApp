'use strict'

/**
 * redirecting to the ui of interested videos of the user
 * @param {*} data 
 * @param {*} _props 
 * @param {*} event 
 * @returns 
 */
const service = require("../../services/userDataService");
const functions = require("../../resources/functions");
module.exports = async (_props, event, api) => {
    var list = [];
    // await service.createDatastore(api, "listOfUndiscoveredMovies").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));
    // await service.createDatastore(api, "userInterests").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));
    // await service.createDatastore(api, "userViewed").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));
    // // ???? pas sur de garder cette donnée
    // // service.createDatastore(api, "userNotViewed").then(function (response) {
    // //     response.data
    // // }).catch((e => { list.push(e) }));
    // await service.createDatastore(api, "vars").then(function (response) {
    //     response.data
    // }).catch((e => { list.push(e) }));

    console.log("LOAD ALLL SIUUUUUUUUUUUUUUU");
    var listOfUndiscoveredMovies = {};
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 11111111111111111111");
    var movieInfoToSee = null;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 22222222222222222222");
    var start = 0;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 333333333333333333333");
    
    // boucle for pour ajouter chacune des séries films depuis l'api de films vers l'api de données lenra
    (await functions.queryPopularMovies("941cc48f228b", start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 44444444444444444444444");
    (await functions.queryPopularTvShows("941cc48f228b", start)).forEach((element) => listOfUndiscoveredMovies["tvshows_" + element.id] = ["tvshows_" + element.id, element.title]);
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 555555555555555555555555");
    
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 66666666666666666666666");
    var mixedArray = Object.values(listOfUndiscoveredMovies).sort((a, b) => 0.5 - Math.random());
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 77777777777777777777777");
    await Promise.all(mixedArray.map((element) => {
        return service.new(api, "listOfUndiscoveredMovies", [element[0], element[1]]).then(function (response) {
            response.data;
        }).catch((e => {
            list.push(e);
            console.log("ERROR " + e);
        }));
    }
    ));
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 88888888888888888888888");
    start += 5;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 99999999999999999999999999");
    
    var listOfUndiscoveredMoviesFromApi = (await service.getDatastore(api, "listOfUndiscoveredMovies"));
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 101010101010101010");
    console.log(listOfUndiscoveredMoviesFromApi.data.data[0].data);
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 11111111111111111111111111");
    var currentId = listOfUndiscoveredMoviesFromApi.data.data[0].data[0];
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 121212121212121212121212");
    var currentMovieInfo = (String(currentId).includes("tvshows_")) ? (await functions.getTvShowDetails("941cc48f228b", String(currentId).substring(8))) : (await functions.getMovieDetails("941cc48f228b", currentId));
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 131313131313131313131313131313");
    console.log(currentMovieInfo);
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 14141414141414141414141414141414");
    var variables = {
        apiKey: "941cc48f228b",
        totalWastedTime: 0,
        totalSavedTime: 0,
        potentialWasteTime: 0,
        menuTimeLabel: "tempsPerdu",
        searchValue: "",
        tvShowIdToSetupSeasons: -1,
        currentTvShowViewedSeasons: 1,
        overlaySliderValue: 1,
        start: start,
        overlayState: false,
        currentMovieInfo: currentMovieInfo,
        movieInfoToSee: movieInfoToSee,
        currentId: currentId,
        movieInfoButtonColor: [0xF4212121, 0xFFFFFFFF],
        bottomButtonsColors: [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]],
        dropDownDefaultButtonColor: 0xFF1E232C,
        white: 0xFFFFFFFF,
        black: 0xFF000000,
        darkbg: 0xFF212121,
        hoverMenuButtonColor: 0xFFB5B5B5,
        menuHoverButton1Color: [0xFF000000, 0xFFFFFFFF],
        menuHoverButton2Color: [0xFF000000, 0xFFFFFFFF],
        bottomButton1Color: [0xFF72BD28, 0xFFFFFFFF],
        bottomButton2Color: [0xFFBD7228, 0xFFFFFFFF],
        bottomButton3Color: [0xFFBD2828, 0xFFFFFFFF],
        dropDownButton1Color: [0xFF1E232C, 0xFFFFFFFF],
        dropDownButton2Color: [0xFF1E232C, 0xFFFFFFFF],
        dropDownButton3Color: [0xFF1E232C, 0xFFFFFFFF],
        navigation: "home"
    }
    // var vars = (await service.getDatastore(api, "vars")).data.data[0];
    // var id = vars._id;
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 1515151515151515151515151515151515151515");
    await service.new(api, "vars", variables).then(function (response) {
        response.data
    }).catch((e => {
        list.push(e);
        console.log(e);
    }));
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 161616161616161616161616161616161616161616161616");
    var vars = (await service.getDatastore(api, "vars")).data.data[0];
    console.log("TESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT 171717171717171717171717171717171717171717171717");
    console.log(vars);
    return list;
}