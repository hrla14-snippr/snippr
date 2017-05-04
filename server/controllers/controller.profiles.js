const db = require('../models/db');
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  // check if any row in barber/clients table has this id
  // req.body.authId
  console.log(req.body);
  const accountType = req.body.accountType;
  delete req.body.accountType;
  db[accountType]
    .find({ where: { id: req.body.id } })
    .then((data) => {
      res.json(data);
    })
    .catch(err => console.log('error finding profile', err));
};

exports.addProfile = (req, res) => {
  // req.body will contain profile info
  // id: "authId string format"
  // address:"asdf"
  // fname: "asdf"
  // lname: "asdf"
  // styles: '1246' concatted ids of styles for this user
  // save this to DB
  console.log('profile', req.body);
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
