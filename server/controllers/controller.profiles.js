
// store whether user is snypee or snyppr in auth0 profile

exports.verifyHasProfile = (req, res) => {
  // check if any row in barber/clients table has this id
  // req.body.authId
  res.json();
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
  res.send('login');
};
