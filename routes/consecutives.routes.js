const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/auth');
const cardTypeController = require('../controller/admin/cardType.controller');
const discountTicketsController = require('../controller/admin/discountTicket.controller');
const foodLineController = require('../controller/admin/foodLine.controller');
const consecutivesController = require('../controller/admin/consecutive.controller');
const paymentProcessorController = require('../controller/admin/paymentProcessor.controller');
const priceTypeController = require('../controller/admin/priceType.controller');
const productsController = require('../controller/admin/product.controller');


// GET
// CONSECUTIVES
router.get('/consecutives', isAuth, consecutivesController.getConsecutives);
router.get('/consecutive/:consecutiveId', isAuth, consecutivesController.getEditConsecutive);
router.post('/consecutive', isAuth, consecutivesController.putConsecutive);
// PRICE TYPES
router.post('/priceType', isAuth, priceTypeController.postPriceType);
router.get('/priceTypes', isAuth, priceTypeController.getPriceTypes);
router.get('/priceType/:priceTypeId', isAuth, priceTypeController.getAddEditPriceTypes);
router.post('/priceType/edit', isAuth, priceTypeController.putPriceType);
router.post('/priceType/delete', isAuth, priceTypeController.deletePriceType);
// CARD TYPES
router.post('/cardType', isAuth, cardTypeController.postCardType);
router.get('/cardTypes', isAuth, cardTypeController.getCardTypes);
router.get('/cardType/:cardTypeId', isAuth, cardTypeController.getAddEditCardType);
router.post('/cardType/edit', isAuth, cardTypeController.putCardType);
router.post('/cardType/delete', isAuth, cardTypeController.deleteCardType);
// PAYMENT PROCCESSORS TYPES
router.post('/paymentProcessor', isAuth, paymentProcessorController.postPaymentProcessor);
router.get('/paymentProcessors', isAuth, paymentProcessorController.getPaymentProcessors);
router.get('/paymentProcessor/:processorId', isAuth, paymentProcessorController.getAddEditPaymentProcessors);
router.post('/paymentProcessor/edit', isAuth, paymentProcessorController.putPaymentProcessor);
router.post('/paymentProcessor/delete', isAuth, paymentProcessorController.deletePaymentProcessor);
// DISCOUNT TICKETS
router.post('/discountTicket', isAuth, discountTicketsController.postEditDiscountTicket);
router.get('/discountTickets', isAuth, discountTicketsController.getDiscountTickets);
router.get('/discountTickets/:discountTicketId', isAuth, discountTicketsController.getAddEditDiscountTickets);
router.post('/discountTicket/edit', isAuth, discountTicketsController.putDiscountTicket);
router.post('/discountTicket/delete', isAuth, discountTicketsController.deleteDiscountTicket);
// FOOD LINES
router.get('/foodLines', isAuth, foodLineController.getFoodLines);
router.get('/foodLines/:foodLineId', isAuth, foodLineController.getAddEditFoodLines);
router.post('/foodLine', isAuth, foodLineController.postFoodLine);
router.post('/foodLine/edit', isAuth, foodLineController.putFoodLine);
router.post('/foodLine/delete', isAuth, foodLineController.deleteFoodLine);
// PRODUCTS
router.post('/product', isAuth, productsController.postProduct);
router.get('/products', isAuth, productsController.getProducts);
router.get('/products/:productId', isAuth, productsController.getAddEditProducts);
router.post('/product/edit', isAuth, productsController.putProduct);
router.post('/product/delete', isAuth, productsController.deleteProduct);


module.exports = {
    routes: router,
};
