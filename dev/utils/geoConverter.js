const axios = require('axios');
require('dotenv').config();

const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
require('dotenv').config();

const geoConverter = address =>
   axios.get(`${URL}${address}&key=AIzaSyBCzjrSU85s1Uztg4n2PaNYtG2ff9dMPKk`)
    .then((response) => {
      console.log(response);
      return response.data.results[0].geometry.location;
    })
    .catch((err) => {
      console.log('there was an error calculating lat and long ', err);
    });

module.exports = geoConverter;
