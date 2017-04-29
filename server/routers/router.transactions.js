const Router = require('express').Router();
const transactionController = require('../controllers/controller.transactions');

Router.get('/transaction', transactionController.fetchTransactions);
Router.post('/transaction', transactionController.addTransaction);

module.exports = Router;
