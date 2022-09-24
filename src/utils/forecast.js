const request = require('request');

const API_KEY = '257b08b0fd9786cf5fa67b5d716da8f4';

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  request({ url, json: true }, (err, data) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (data.body.cod !== 200) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, data.body);
    }
  });
};

module.exports = forecast;
