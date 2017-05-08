// const request = require('request-promise');
const db = require('../models/db');
const axios = require('axios');
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');
// db.Snyppr.findOne({ where: { id: authId } })
//         .then(({ id }) =>
exports.fetchStripeSnyppr = (req, res) => {
  // res.send(req.query);
  axios.post('https://connect.stripe.com/oauth/token', {
    code: req.query.code,
    client_secret: 'sk_test_DLdp9uxn2BsYrBMyVsvyvPdv',
    grant_type: 'authorization_code',
  })
    .then((response) => {
      const authId = req.query.state;
      const stripeId = response.data.stripe_user_id;
      return db.SnypprStripe
        .create({
          id: stripeId,
          snypprId: authId,
        });
    }).then(() => {
      res.redirect('/client/newUser');
    }).catch(e => console.log('stripe network err', e));
};

exports.sendPayment = (req, res) => {
  // req.body.snypprId && snypeeId
  const token = req.body.token.id;
  const destination = req.body.snyppr;
  // Token is created using Stripe.js or Checkout!
  // Get the payment token submitted by the form:
  // Create a Charge:
  stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: token,
    destination: {
      account: destination,
    },
  })
    .then(charge =>
      // asynchronously called
       db.Transaction.create({
         snypeeId: req.body.snypeeId,
         snypprId: req.body.snypprId,
         price: charge.amount,
       }))
    .then((data) => {
      console.log(data);
      res.send('Charge successful');
    })
    .catch(e => console.log('error charging', e));
};
