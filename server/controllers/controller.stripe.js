const axios = require('axios');
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');
const SnypprStripe = require('../models/db').SnypprStripe;

exports.fetchStripeSnyppr = (req, res) => {
  // res.send(req.query);
  axios.post('https://connect.stripe.com/oauth/token', {
    code: req.query.code,
    client_secret: 'sk_test_DLdp9uxn2BsYrBMyVsvyvPdv',
    grant_type: 'authorization_code',
  }).then((response) => {
    SnypprStripe.create({ id: response.data.stripe_user_id, snyprrId: req.body.id })
    .then((data) => {
      res.send(data);
      // res.send(response.data)
    });
  });
};

exports.sendPayment = (req, res) => {
  const token = req.body.token.id;
  const destination = req.body.snyppr;
  console.log('token is ', token);
  console.log('destination is ', destination);
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
  }).then((charge) => {
    // asynchronously called
    console.log(charge);
    res.send(charge);
  });
};
