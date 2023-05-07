const Account = require('../models/account');

exports.postAddAccount = (req, res, next) => {
    console.log("register:post");
    const account = req.body.account;
    const password = req.body.password;
    const accou = new Account(              //construct了，所以後面呼叫變accou
        account,
        password,
        null);

    Account
        .findByAccount(account)
        .then(result => {
            if (result.length == 0) {
                console.log("沒找到，存");
                accou.save();               //findByAccount結果要用promise.then來接資料，不然在外面都是Promise{<pending>}
                res.redirect('/');          //註冊完帳號回到登入頁面
            } else {
                console.log("有找到，不存");
                console.log('result:', result);
                res.render('register', { alertSign: 'fire' });
            }
        }).catch(err => {
            console.log(err);
        });
};

exports.getAccounts = (req, res, next) => {
    console.log("main:get");
    const edit = req.query.edit;
    Account.fetchAll()                  // 有static，不能accou.fetchAll
        .then(account => {
            if (edit === 'true') {
                res.render('admin/account', {
                    accou: account
                })
            } else {
                res.render('user/account_list', {
                    accou: account
                })
            }
        }).catch(err => console.log(err));
};    
    

exports.getEditAccount = (req, res, next) => {
    const accountID = req.params.accountId;    // 網址後方的 /:內容
    Account.findById(accountID)
        .then(account => {
            res.render('admin/edit-account', {
                account: account
            });
        })
        .catch(err => console.log(err));
};

exports.postEditAccount = (req, res, next) => {
    console.log("account:post:edit");
    const accountUpdate = req.body.account;
    const passwordUpdate = req.body.password;
    const accountID = req.body.accountId;

    const account = new Account(
        accountUpdate,
        passwordUpdate,
        accountID
    );
    account
        .save()
        .then(result => {
            console.log('Update Account');
            res.redirect('/admin/account?edit=true');
        })
        .catch(err => console.log(err));
};

exports.getDeleteAccount = (req, res, next) => {
    const accountID = req.params.accountId;
    Account.deleteById(accountID)
        .then(() => {
            console.log('Delete Account');
            res.redirect('/admin/account?edit=true');
        }).catch(err => console.log(err));

};

exports.checkLogin = (account,password,cb) => {
    Account
        .findByAccount(account)
        .then(result => {
            if (result.length == 0 || result[0]['password'] !== password ) {
                console.log('checklog1');
                cb(null, null);                // 沒權限
            }else {
                console.log('checklog2');
                cb(null, result);
            }
        }).catch(err => {
            console.log(err);
            cb(null, null); 
        });
};
const bcrypt = require('bcryptjs')
exports.postRegister = (req, res) => {
    const { account, password, rePassword } = req.body
    console.log('account:',account, 'password:',password,'rePass:',rePassword );
    // error message for flash
    const errors = []

    // not accepting empty input
    if (!account || !password || !rePassword) { 
        console.log('1st err');
        errors.push({ message: '帳號和密碼是必填喔' }) }
    // password and confirm password must be the same
    if (password !== rePassword) { 
        console.log('2nd err');
        errors.push({ message: '密碼錯誤' }) }
    // show signup page again with inputted data when invalid 
    if (errors.length > 0) {
        console.log('3rd err');
        return res.render('register')//, { account, password, rePassword, errors, userCSS: true })
    }

    Account.findOne({ account: account })
      .then(user => {
        // if account already exist, redirect to log in page
        if (user) { return res.render('entrance') }//, { account, userCSS: true, errors: [{ message: '此帳號已經註冊過，請直接登入' }] }) }
        // otherwise, create new document
        const newAccount = new Account({ account, password })
        // encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAccount.password, salt, (err, hash) => {
            if (err) throw err
            // replace password with hashed one
            newAccount.password = hash
            //save document to user collection
            newAccount.save()
              .then(user => {
                return res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      })
    }