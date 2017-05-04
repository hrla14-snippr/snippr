const Router = require('express').Router();

const stripeController = require('../controllers/controller.stripe');

Router.get('/stripeId', stripeController.fetchStripeSnyppr);
Router.post('/sendPayment', stripeController.sendPayment);
module.exports = Router;
