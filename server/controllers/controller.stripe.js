  const axios = require('axios');
  const stripe = require('stripe')('sk_test_DLdp9uxn2BsYrBMyVsvyvPdv');

  exports.fetchStripeSnyppr = (req, res) => {
    // res.send(req.query);
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
        // user.save((err,user)=>{
        //   if (err){
        //     return console.log('failed adding user:',err);
        //   }
          // console.log(user);
        res.send(response.data);
      });
    });
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
    }).then((charge) => {
      // asynchronously called
      console.log(charge);
      res.send(charge);
    });
  };
