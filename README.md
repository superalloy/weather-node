# weather-node
udemy learning node weather app

create a file called: ./config/secrets.js that exports an apikey for use by google api as apikey, and also exports an api for the darksky forcast.io api key as dskey.

i.e.:
mkdir config
vi ./config/secrets.js

const apikey = '<your private api key>';
const dskey = '<your darksky forecast api key>';
module.exports = {
  apikey,
  dskey
};

