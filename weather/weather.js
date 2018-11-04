const request = require('request');
const conf = require('../config/secrets.js');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${conf.dskey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect');
        } else if (response.statusCode !== 200){
            callback('unable to connect to weather');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};


module.exports.getWeather = getWeather;
