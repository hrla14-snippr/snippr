const db = require('../models/db');
const geoConverter = require('../../dev/utils/geoConverter');
const stringConverter = require('../../dev/utils/stringConverter');
const distFinder = require('../../dev/utils/distFinder');
const promiseAll = require('bluebird').all;


exports.fetchBarbers = (req, res) => {
  const userAddress = stringConverter(req.params.address);
  let userCoord;
  const closeBarbers = [];
  geoConverter(userAddress)
    .then((user) => {
      userCoord = user;
    })
    .catch((err) => {
      console.log('error with user coordinates ', err);
    });
  db.Barber.findAll()
    .then(results => promiseAll(results.map((barber) => {
      const str = stringConverter(barber.dataValues.address);
      let dist;
      return geoConverter(str)
          .then((coords) => {
            dist = distFinder(userCoord.lat, userCoord.lng, coords.lat, coords.lng);
            if (dist < 20) {
              closeBarbers.push(barber.dataValues);
            }
          })
          .catch((err) => {
            console.log('something went wrong converting promises ', err);
          });
    }))
        .then(() => {
          console.log(closeBarbers);
          res.send(closeBarbers);
        }))
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};
