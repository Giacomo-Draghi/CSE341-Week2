const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// const adminData = require('./admin');

const shopController = require('../controllers/shop');

const router = express.Router();

// Get uses EXACT metch, so it will not always run, unlike the use()
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// router.get('/products/delete');

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;