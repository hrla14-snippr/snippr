const Router = require('express').Router();
const barberLocationController = require('../controllers/controller.barberlocations');

Router.get('/nearbyBarbers', barberLocationController.fetchBarbers);

module.exports = Router;
