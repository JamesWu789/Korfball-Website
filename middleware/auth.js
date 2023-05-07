module.exports = function ensureAuthenticated(req, res, next) {
    // 若使用者已通過驗證，則觸發 next()
    console.log('middle auth');
    if (req.isAuthenticated()) { 
        return next() 
    }
    // 若使用者尚未通過驗證，則將使用者導向登入頁面
    res.redirect('/')
  }




