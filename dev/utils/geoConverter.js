const axios = require('axios');

const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
require('dotenv').config();

const geoConverter = address =>
   axios.get(`${URL}${address}&key=${process.env.G_MAPKEY}`)
    .then((response) => {
      console.log('gmaps response', response.data);
      // TODO: Fix this. Returning does nothing in a then block.
      return response.data.results[0].geometry.location;
    })
    .catch((err) => {
      console.log('there was an error calculating lat and long ', err);
    });

module.exports = geoConverter;
