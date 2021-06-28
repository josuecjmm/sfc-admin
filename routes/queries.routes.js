const express = require('express');
const router = express.Router();

const queriesController = require('../controller/queries.controller');

// AUDITS
router.get('/audits', queriesController.getAudits);
// ORDERS
router.get('/orders', queriesController.getOrders);
// PRODUCTS
router.get('/productsRegistry', queriesController.getProducts);
// ERRORS
router.get('/errors', queriesController.getErrors);

module.exports = {
    routes: router,
};

