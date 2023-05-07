const express = require('express');
const app = express();
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth');

// 細部功能都在controllers
const adminController_product = require('../controllers/product');
router.get('/product',ensureAuthenticated, adminController_product.getProducts);
        
//work
const adminController_work = require('../controllers/work');
router.get('/work',ensureAuthenticated, adminController_work.getWorks);

// account
const adminController_account = require('../controllers/account');
router.get('/account',ensureAuthenticated, adminController_account.getAccounts);             // account頁面看

const adminController_upload = require('../controllers/upload')
router.post('/uploadFile', ensureAuthenticated, (req,res)=>{
    adminController_upload(req,res,(err)=>{
        console.log('req.file:',req.file);
        res.redirect('/product')
    });
});

const adminController_wordEdit = require('../controllers/wordEdit');
router.get('/wordEdit', ensureAuthenticated, adminController_wordEdit); 

module.exports = router;