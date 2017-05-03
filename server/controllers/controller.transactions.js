// change test_key
const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

exports.fetchTransactions = (req, res) => {
  res.send('fetch transaction');
};

exports.addTransaction = (req, res) => {
  const token = req.body.id;
  // Charge the user's card:
  const charge = stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  }, (err, charge) => {
    // asynchronously called
  });

  res.send('Successfully made payment');
};
