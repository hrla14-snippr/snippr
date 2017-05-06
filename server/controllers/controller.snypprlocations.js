const db = require('../models/db');
const distFinder = require('../../dev/utils/distFinder');

exports.fetchSnypprs = (req, res) => {
  console.log('req params ', req.params.address);
  const userAddress = JSON.parse(req.params.address);
  console.log(userAddress);
  db.Snyppr.findAll()
    .then((snypprs) => {
      const filtered = snypprs.filter((snyppr) => {
        console.log('each snyppr ', snyppr);
        const dist = distFinder(userAddress.lat, userAddress.lng, snyppr.lat, snyppr.lng);
        if (dist < 20) {
          console.log('it was less than 20');
          return snyppr;
        }
      });
      res.send(filtered);
    })
    .catch((err) => {
      console.log('error during filter process ', err);
      res.status(500);
    });
};
