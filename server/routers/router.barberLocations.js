const Router = require('express').Router();
const barberLocationController = require('../controllers/controller.barberlocations');

Router.get('/nearbyBarbers/:address', barberLocationController.fetchBarbers);

module.exports = Router;
