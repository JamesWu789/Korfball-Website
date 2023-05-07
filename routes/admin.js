const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth')

// 細部功能都在controllers
const adminController_product = require('../controllers/product');
router.post('/product', ensureAuthenticated, adminController_product.postAddProduct);
router.get('/product', ensureAuthenticated, adminController_product.getProducts);
router.get('/product/edit-product/:productId', ensureAuthenticated, adminController_product.getEditProduct);
router.post('/product/edit-product', ensureAuthenticated, adminController_product.postEditProduct);
router.get('/product/delete-product/:productId', ensureAuthenticated, adminController_product.getDeleteProduct);

//work
const adminController_work = require('../controllers/work');
router.get('/work', ensureAuthenticated, adminController_work.getWorks);
router.post('/work', ensureAuthenticated, adminController_work.postAddWork);
router.get('/work/edit-work/:workId', ensureAuthenticated, adminController_work.getEditWork);
router.post('/work/edit-work', ensureAuthenticated, adminController_work.postEditWork);
router.get('/work/delete-work/:workId', ensureAuthenticated, adminController_work.getDeleteWork);

// account
const adminController_account = require('../controllers/account');
router.get('/account', ensureAuthenticated, adminController_account.getAccounts);             // account頁面看
router.get('/account/edit-account/:accountId', ensureAuthenticated, adminController_account.getEditAccount);
router.post('/account/edit-account', ensureAuthenticated, adminController_account.postEditAccount);
router.get('/account/delete-account/:accountId', ensureAuthenticated, adminController_account.getDeleteAccount);


module.exports = router;