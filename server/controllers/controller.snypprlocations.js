const db = require('../models/db');
const geoConverter = require('../../dev/utils/geoConverter');
const stringConverter = require('../../dev/utils/stringConverter');
const distFinder = require('../../dev/utils/distFinder');
const promiseAll = require('bluebird').all;

exports.fetchSnypprs = (req, res) => {
  console.log('req params ', req.params.address);
  const userAddress = stringConverter(req.params.address);
  let userCoord;
  const closeSnypprs = [];
  geoConverter(userAddress)
    .then((user) => {
      userCoord = user;
    })
    .catch((err) => {
      console.log('error with user coordinates ', err);
    });
  db.Snyppr.findAll()
    .then(results => promiseAll(results.map((snyppr) => {
      const str = stringConverter(snyppr.dataValues.address);
      let dist;
      return geoConverter(str)
          .then((coords) => {
            dist = distFinder(userCoord.lat, userCoord.lng, coords.lat, coords.lng);
            if (dist < 20) {
              closeSnypprs.push([snyppr.dataValues, coords.lat, coords.lng]);
            }
          })
          .catch((err) => {
            console.log('something went wrong converting promises ', err);
          });
    }))
        .then(() => {
          res.send(closeSnypprs);
        }))
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};
