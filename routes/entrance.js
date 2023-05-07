const express = require('express');
const router = express.Router();

const passport = require('passport')
// 加入 middleware，驗證 request 登入狀態
router.post('/', passport.authenticate('local', {
    successRedirect: '/product?edit=true',   //成功的話
    failureRedirect: '/'  
    }));

router.get('/', (req, res, next) => {
    console.log('ent:get');
    res.render('entrance');
});

// //登入判定
const adminController_account = require('../controllers/account');
// router.post('/', adminController_account.checkLogin);

// 登出
router.get('/logout',(req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log('logout');
        res.redirect('/');
    });
});

// 註冊操作
router.post('/register', adminController_account.postRegister);       // register頁面新增

// 註冊頁面
router.get('/register', (req, res, next) => {
    console.log('reg:get');
    res.render('register');
});

module.exports = router;