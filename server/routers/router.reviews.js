const Router = require('express').Router();
const reviewController = require('../controllers/controller.reviews');

// Router.get('/reviews/', reviewController.fetchReviews);
Router.post('/reviews/', reviewController.addReview);

module.exports = Router;
