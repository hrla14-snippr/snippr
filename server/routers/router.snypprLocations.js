const Router = require('express').Router();
const snypprLocationController = require('../controllers/controller.snypprlocations');

Router.get('/nearbySnypprs', snypprLocationController.fetchSnypprs);

module.exports = Router;
