// const request = require('request-promise');
const db = require('../models/db');
const axios = require('axios');
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

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
      return db.Snyppr.findOne({ where: { id: authId } })
        .then(({ id }) => db.SnypprStripe
        .create({
          id: stripeId,
          snypprId: id,
        }));
    }).then(() => {
      res.redirect('/client/newUser');
    }).catch(e => console.log('stripe network err', e));
};

exports.sendPayment = (req, res) => {
  const token = req.body.token.id;
  const destination = req.body.snyppr;
  console.log('token is ', token);
  console.log('destination is', destination);
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
    .then((charge) => {
      // asynchronously called
      console.log(charge);
      res.send(charge);
    });
};
