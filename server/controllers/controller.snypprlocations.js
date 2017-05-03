const db = require('../models/db');

exports.fetchSnypprs = (req, res) => {
  db.Snyppr.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};
