const request = require('request');

const API_KEY =
  'pk.eyJ1IjoiemlhZGhvc255IiwiYSI6ImNsODNoa2E4NjA1bXIzd3MyeTgwZmMxMGsifQ.cH-_rPTpvT4iAp9FeZZawA';

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${API_KEY}&limit=1`;

  request({ url, json: true }, (err, data) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (data.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: data.body.features[0].center[1],
        longitude: data.body.features[0].center[0],
        location: data.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
