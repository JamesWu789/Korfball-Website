const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const passport = require('passport')

router.post('/', (req, res, next) =>{
    //先做圖片驗證
    if (req.body.imgTest.toLowerCase() !== req.body.imgText.toLowerCase()){ //不管大小寫
        console.log('Img diff!!');
        res.redirect('/');
    }console.log('Img correct');
    return next()
    },
    // 驗證可否登入
    passport.authenticate('local', {
    successRedirect: '/product?edit=true',   //成功的話
    failureRedirect: '/'  
    }));

router.get('/', (req, res, next) => {
    const options = {   //圖片驗證
        size: 4,
        ignoreChars: '0o1i',
        noise: 0,
        color: false,
      }
    const captcha = svgCaptcha.create();
    console.log('ent:get');
    console.log(captcha.text);
    res.render('entrance', {
        imgText: captcha.text,
        svgImg: captcha.data
    });
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