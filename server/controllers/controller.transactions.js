// change test_key
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

exports.fetchTransactions = (req, res) => {
  // TODO: grab from db /:snypprId
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
  }).then((charge) => {
    // asynchronously called
    console.log(charge);
    res.send(charge);
  });
};

exports.addTransaction = (req, res) => {
  const token = req.body.token.id;
  const destination = req.body.stripeId;
  const amount = req.body.amount;
  // Charge the user's card:
  stripe.charges.create({
    amount,
    currency: 'usd',
    source: token,
    destination: {
      account: destination,
    },
  })
  .then((charge) => {
    console.log('stripe paid', charge);
    // TODO: add to db
    res.send(charge);
  })
  .catch(e => console.log('stripe charge error', e));
};
