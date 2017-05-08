const db = require('../models/db');
const strConverter = require('../../dev/utils/stringConverter');
const geoConverter = require('../../dev/utils/geoConverter');
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  const accountType = req.body.accountType;
  delete req.body.accountType;
  const options = accountType === 'Snyppr'
    ? { include: [db.SnypprStripe, db.SnypprReview, db.ProfilePic ] }
    : { include: [{
      model: db.SnypeeReview,
      include: [db.Snyppr],
    },
    {
      model: db.Transaction,
      include: [db.Snyppr, db.SnypprReview],
    }, db.ProfilePic ] };
  options.where = { id: req.body.id };
  db[accountType]
    .find(options)
    .then((data) => {
      res.json(data);
    })
    .catch(err => console.log('error finding profile', err));
};

exports.addProfile = (req, res) => {
  const str = strConverter(req.body.address);
  geoConverter(str)
    .then((location) => {
      req.body.lat = location.lat;
      req.body.lng = location.lng;
      const accountType = req.body.accountType;
      delete req.body.accountType;
      console.log(req.body, accountType);
      db[accountType]
        .create(req.body)
        .then((data) => {
          res.send(data);
          // res.send('login');
        })
        .catch(err => console.log('error creating profile', err));
    })
    .catch((err) => {
      console.log('error during geoconversion, heres the error ', err);
    });
};
