const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/account')
const bcrypt = require('bcryptjs')

module.exports = passport => {
    console.log('In config password');
    // Local Strategy
    passport.use(new LocalStrategy(
      // find credential in parameter named email instead of username(default)
      // set passReqToCallback true to pass req as well
      { usernameField: 'account', passReqToCallback: true },
      (req, account, password, done) => {
        console.log('run config pass1');
        User.findOne({ account: account })
          .then(user => {
            if (!user) { return done(null, false, req.flash('fail_msg', 'Account 輸入錯誤')) }
            // check if user input matches the password in database
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err
              return isMatch ? done(null, user) : done(null, false, req.flash('fail_msg', '密碼錯誤'))
            })
          })
          .catch(err => done(err))
      }
    )) 

  // serialize user instance to the session
  passport.serializeUser((account, done) => {
    console.log('run config pass2');
    done(null, account.id)
  })

  // deserialize user instance from the session
  passport.deserializeUser((id, done) => {
    console.log('run config pass3');
    User.findById(id, (err, account) => {
      done(err, account)
    })
  })
}