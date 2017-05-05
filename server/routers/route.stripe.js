const Router = require('express').Router();

const stylesController = require('../controllers/controller.styles');

Router.get('/stripeId', stylesController.fetchStripeSnyppr);

module.exports = Router;
