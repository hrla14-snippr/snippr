const Router = require('express').Router();
const profileController = require('../controllers/controller.profiles');

Router.post('/verifyProfile/', profileController.verifyHasProfile);
Router.post('/addProfile/', profileController.addProfile);

module.exports = Router;
