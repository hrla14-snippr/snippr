
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  // check if any row in barber/clients table has this id
  // req.body.authId
  res.json();
};

exports.addProfile = (req, res) => {
  // req.body will contain profile info
  // address:"asdf"
  // fname: "asdf"
  // lname: "asdf"
  // style1: false
  // style2: false
  // style3: false
  // save this to DB
  res.send('login');
};
