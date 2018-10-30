const request = require('request');
const conf = require('./config/secrets.js');

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${conf.apikey}&address=14041%20Worth%20Ave%20woodbridge`,
  json: true
}, (error, response, body) => {
  //console.log(JSON.stringify(response, undefined, 2));
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`address: ${body.results[0].formatted_address}`);
  console.log(`lat: ${body.results[0].geometry.location.lat}`);
  console.log(`lng: ${body.results[0].geometry.location.lng}`);
});