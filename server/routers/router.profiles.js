const Router = require('express').Router();
const profileController = require('../controllers/controller.profiles');

Router.post('/verifyProfile/', profileController.verifyHasProfile);
Router.post('/addProfile/', profileController.addProfile);
Router.put('/certified/:id', profileController.updateCertified);

module.exports = Router;
