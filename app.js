const request = require('request');

request({
  url: "",
  json: true
}, (error, response, body) => {
  console.log(body);
});