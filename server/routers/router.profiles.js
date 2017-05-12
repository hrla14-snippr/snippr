const Router = require('express').Router();
const profileController = require('../controllers/controller.profiles');

Router.post('/verifyProfile/', profileController.verifyHasProfile);
Router.post('/addProfile/', profileController.addProfile);
Router.put('/certified/:id', profileController.updateCertified);
Router.put('/updateSnyppr/:id', profileController.updatePersonalitySnyppr);
Router.put('/updateSnypee/:id', profileController.updatePersonalitySnypee);
Router.get('/fetchAllSnypprs', profileController.fetchAllSnypprs);

module.exports = Router;
