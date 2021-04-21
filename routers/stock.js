const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const stockController = require('../controllers/stockController');

const stockRouter = new express.Router();

stockRouter.post('/buy', auth, stockController.buyStock);

stockRouter.post('/sell', auth, stockController.sellStock);

stockRouter.get('/:ticker/company', auth, stockController.getCompanyInfo);

module.exports = stockRouter;
