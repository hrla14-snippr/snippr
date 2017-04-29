const Router  = require('express').Router();
const loginController = require('../controllers/controller.login');

Router.post('/login', loginController.login);
Router.post('/signup', loginController.signup);

module.exports = Router;
