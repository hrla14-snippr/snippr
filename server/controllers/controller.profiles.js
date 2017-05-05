const db = require('../models/db');
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  const accountType = req.body.accountType;
  delete req.body.accountType;
  const options = accountType === 'Snyppr'
    ? { include: [db.SnypprStripe] }
    : {};
  options.where = { id: req.body.id };
  db[accountType]
    .find(options)
    .then((data) => {
      res.json(data);
    })
    .catch(err => console.log('error finding profile', err));
};

exports.addProfile = (req, res) => {
  const accountType = req.body.accountType;
  delete req.body.accountType;
  db[accountType]
    .create(req.body)
    .then((data) => {
      console.log(data);
      res.send('login');
    })
    .catch(err => console.log('error creating profile', err));
};
