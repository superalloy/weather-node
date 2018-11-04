const yargs = require('yargs');
const conf = require('./config/secrets.js');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to get weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${conf.apikey}&address=${encodeAddress}`;
axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find address');
  }
  // console.log(JSON.stringify(response, undefined, 2));
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  // console.log(`lat: ${lat}; long: ${lng}`);
  var weatherUrl = `https://api.darksky.net/forecast/${conf.dskey}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently: ${temperature}, but it feels like ${apparentTemperature}.`);
  })
}).catch((e) => {
  if (e.code === 'ECONNREFUSED') {
    console.log('unable to connect');
  } else {
    console.log(e.message);
  }
});

// geocode.geocodeAddress(argv.a, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(results.address);
//     weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//       console.log(`It is ${weatherResults.temperature} and it feels like ${weatherResults.apparentTemperature}.`);
//     });
//   }
// });




