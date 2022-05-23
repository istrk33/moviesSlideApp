'use strict'

const service = require("../../services/userDataService");
const functions = require("../../resources/functions");

module.exports = async (props, event, api) => {
//     var list = [];
//     var listOfUndiscoveredMovies = {};
//     var movieInfoToSee = null;
//     var start = 0;

//     // boucle for pour ajouter chacune des séries films depuis l'api de films vers l'api de données lenra
//     // (await functions.queryPopularMovies("941cc48f228b", start)).forEach((element) => listOfUndiscoveredMovies[element.id] = [element.id, element.title]);
//     (await functions.queryPopularTvShows("941cc48f228b", start)).forEach((element) => listOfUndiscoveredMovies["tvshows_" + element.id] = ["tvshows_" + element.id, element.title]);

//     var mixedArray = Object.values(listOfUndiscoveredMovies).sort((a, b) => 0.5 - Math.random());
//     await Promise.all(mixedArray.map((element) => {
//         return service.new(api, "listOfUndiscoveredMovies", [element[0], element[1]]).then(function (response) {
//             response.data;
//         }).catch((e => {
//             list.push(e);
//             console.log("ERROR " + e);
//         }));
//     }
//     ));
//     start += 5;

//     var listOfUndiscoveredMoviesFromApi = (await service.getDatastore(api, "listOfUndiscoveredMovies"));
//     var currentId = listOfUndiscoveredMoviesFromApi.data.data[0].data[0];
//     var currentMovieInfo = (String(currentId).includes("tvshows_")) ? (await functions.getTvShowDetails("941cc48f228b", String(currentId).substring(8))) : (await functions.getMovieDetails("941cc48f228b", currentId));
//     var variables = {
//         apiKey: "941cc48f228b",
//         totalWastedTime: 0,
//         totalSavedTime: 0,
//         potentialWasteTime: 0,
//         menuTimeLabel: "tempsPerdu",
//         searchValue: "",
//         tvShowIdToSetupSeasons: -1,
//         currentTvShowViewedSeasons: 1,
//         overlaySliderValue: 1,
//         start: start,
//         overlayState: false,
//         currentMovieInfo: currentMovieInfo,
//         movieInfoToSee: movieInfoToSee,
//         currentId: currentId,
//         movieInfoButtonColor: [0xF4212121, 0xFFFFFFFF],
//         bottomButtonsColors: [[0xFF72BD28, 0xFFCEEFAE], [0xFFBD7228, 0xFFE3A482], [0xFFBD2828, 0xFFD86E6E]],
//         dropDownDefaultButtonColor: 0xFF1E232C,
//         white: 0xFFFFFFFF,
//         black: 0xFF000000,
//         darkbg: 0xFF212121,
//         hoverMenuButtonColor: 0xFFB5B5B5,
//         menuHoverButton1Color: [0xFF000000, 0xFFFFFFFF],
//         menuHoverButton2Color: [0xFF000000, 0xFFFFFFFF],
//         bottomButton1Color: [0xFF72BD28, 0xFFFFFFFF],
//         bottomButton2Color: [0xFFBD7228, 0xFFFFFFFF],
//         bottomButton3Color: [0xFFBD2828, 0xFFFFFFFF],
//         dropDownButton1Color: [0xFF1E232C, 0xFFFFFFFF],
//         dropDownButton2Color: [0xFF1E232C, 0xFFFFFFFF],
//         dropDownButton3Color: [0xFF1E232C, 0xFFFFFFFF],
//         navigation: "home"
//     }
//     await service.new(api, "vars", variables).then(function (response) {
//         response.data
//     }).catch((e => { console.log(e); }));
//     return list;
}