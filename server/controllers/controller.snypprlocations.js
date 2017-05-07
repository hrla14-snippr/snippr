const db = require('../models/db');
const distFinder = require('../../dev/utils/distFinder');

exports.fetchSnypprs = (req, res) => {
  console.log('req params ', req.params.address);
  const userAddress = JSON.parse(req.params.address);
  console.log(userAddress);
  db.Snyppr.findAll({ include: [db.SnypprStripe, db.SnypprReview] })
    .then((snypprs) => {
      const filtered = snypprs.filter(snyppr =>
        distFinder(userAddress.lat, userAddress.lng, snyppr.lat, snyppr.lng) < 20);
      res.send(filtered);
    })
    .catch((err) => {
      console.log('error during filter process ', err);
      res.status(500);
    });
};
