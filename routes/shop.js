const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

// Get uses EXACT metch, so it will not always run, unlike the use()
router.get('/', (req, res, next) => {
    console.log('Home middleware!');
    console.log('shop.js', adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html')); //Send a responce
    // we defined the path inside the variable in the app.js
    res.render('shop', {
        prods: products,
        docTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;