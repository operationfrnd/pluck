const axios = require('axios');

const MAPBOX_API_KEY = 'pk.eyJ1Ijoib3Bmcm5kIiwiYSI6ImNqc21odTF2bzAxcG00M293ODBlZzRyNWkifQ.nHZlATI4NkhQgU579snn9Q';
const getPlantCoords = (query) => {
  // search for videos based on the query
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=address&access_token=`;
  return axios.get(`${url}${MAPBOX_API_KEY}`).then((searchResults) => {
    // perform a callback with the first 'feature' which is the most relevant search result => most accurate
    // console.log(searchResults.features[0]);
    // callback(null, searchResults.features[0].center);
    console.log(searchResults.data.features[0].center);
    return searchResults.data.features[0].center;
  }).catch((err) => {
    console.log(err);
    // callback(err, null);
  });
};

// getPlantCoords('222 Chartres Street, New Orleans, LA');

module.exports.getPlantCoords = getPlantCoords;
