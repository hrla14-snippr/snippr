const Router = require('express').Router();
const favoritesController = require('../controllers/controller.favorites');

Router.get('/favorites/:snypeeId', favoritesController.fetchFavorites);
Router.post('/favorites', favoritesController.addFavorite);
Router.delete('/favorites/:favToDelete', favoritesController.deleteFavorite)

module.exports = Router;
