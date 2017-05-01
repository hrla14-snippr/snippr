const db = require('../models/db');

exports.fetchBarbers = (req, res) => {
  db.Barber.findAll()
    .then((results) => {
      console.log('these are the results being sent back', results);
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};
