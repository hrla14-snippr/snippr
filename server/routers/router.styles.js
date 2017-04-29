const Router  = require('express').Router();
const stylesController = require('../controllers/controller.styles');

Router.get('/styles', stylesController.fetchStyles);

module.exports = Router;