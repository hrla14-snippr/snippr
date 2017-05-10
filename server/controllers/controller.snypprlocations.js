const db = require('../models/db');
const distFinder = require('../../client/utils/distFinder');

exports.fetchSnypprs = (req, res) => {
  const userAddress = JSON.parse(req.params.address);
  db.Snyppr.findAll({ include: [db.SnypprStripe, db.ProfilePic, {
    model: db.SnypprReview,
    include: db.Snypee,
  }] })
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
