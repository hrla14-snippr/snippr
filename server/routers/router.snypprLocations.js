const Router = require('express').Router();
const snypprLocationController = require('../controllers/controller.snypprlocations');

Router.get('/nearbySnypprs/:address', snypprLocationController.fetchSnypprs);

module.exports = Router;
