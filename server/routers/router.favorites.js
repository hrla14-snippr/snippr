const Router  = require('express').Router();
const favoritesController = require('../controllers/controller.favorites')

Router.get('/favorites', favoritesController.fetchFavorites);
Router.post('/favorites', favoritesController.addFavorite);

module.exports = Router;
