const axios = require('axios');
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

exports.fetchStripeSnyppr = (req, res) => {
  axios.post('https://connect.stripe.com/oauth/token', {
    code: req.query.code,
    client_secret: 'sk_test_DLdp9uxn2BsYrBMyVsvyvPdv',
    grant_type: 'authorization_code',
  }).then((response) => {
  // res.send(response.data);
    stripe.accounts.retrieve(response.stripe_user_id, (err, account) => {
      console.log('res is ', response);
      console.log('acc is', account);
      // asynchronously called
      // const user = new User(account);
      // user.save((error, savedUser) => {
      //   if (err){
      //     return console.log('failed adding user:', err);
      //   }
        // console.log(user)
      res.send(response);
    }).catch((err) => {
      console.log('post failed:', err);
    });
  });
};
