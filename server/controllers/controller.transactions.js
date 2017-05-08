// change test_key
const db = require('../models/db');
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

exports.fetchTransactions = (req, res) => {
  // TODO: grab from db /:snypprId
  const keys = Object.keys(req.query);
  if (keys.length > 1 && ['Snyppr', 'Snypee'].includes(keys[0])) {
    res.status(400);
  } else {
    const options = { where: {} };
    options.where[keys[0]] = req.query[keys[0]];
    db.Transaction
      .findAll(options)
      .then(data => res.json(data));
  }
};

exports.addTransaction = (req, res) => {
  const token = req.body.token.id;
  const destination = req.body.stripeId;
  const amount = req.body.amount;
  console.log('snypeeId', req.body.snypeeId);
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
    return db.Transaction.create({
      snypeeId: req.body.snypeeId,
      snypprId: req.body.snypprId,
      price: parseFloat(charge.amount / 100).toFixed(2),
    });
  })
  .then((data) => {
    console.log('transaction data', data);
    res.status(201);
  })
  .catch(e => console.log('stripe charge error', e));
};
