const request = require('request');
const conf = require('./config/secrets.js');

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${conf.apikey}&address=14041%20Worth%20Ave%20woodbridge`,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});