import React, { Component } from 'react';

const axios = require('axios');

class PaymentButton extends Component {
  constructor(props) {
    super(props);

    this.handler = StripeCheckout.configure({
      // change key to live key
      key: 'pk_test_IhZuZuB7uOy8VF5pg4XA54Df',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: (token) => {
        // send the token to our server to make the charge
        axios.post('/transaction', token).then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      },
    });

    this.handlePayment = this.handlePayment.bind(this);
  }

  handlePayment(event) {
    event.preventDefault();

    this.handler.open({
      name: 'Barber Services',
      description: 'Pay for On Demand Barber Services',
      amount: 2000,
    });
  }
  render() {
    return (
      <button
        onClick={this.handlePayment}
        className="buyButton"
        id="customButton"
      >Pay With Card</button>
    );
  }
}
// include this script in index.html file
// <script src='https://checkout.stripe.com/checkout.js'></script>

export default PaymentButton;
