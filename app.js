const request = require('request');
const conf = require('./config/secrets.js');

const yargs = require('yargs');

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

var encodedAddress = encodeURIComponent(argv.a);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${conf.apikey}&address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('Unable to connect');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('no results');
  } else if (body.status === 'OK') {
    console.log(`address: ${body.results[0].formatted_address}`);
    console.log(`lat: ${body.results[0].geometry.location.lat}`);
    console.log(`lng: ${body.results[0].geometry.location.lng}`);
  }
});