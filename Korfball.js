//引用外部功能
const path = require('path');
const express = require('express');
const app = express();
var $ = require("jquery");
const passport = require('passport'); 

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://james821202004:19930120@cluster0.yesor0s.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true}) //, useCreateIndex: true })

// retrieve responded "connection" object after successful execution
const db = mongoose.connection
// connection error
db.on('error', () => {
  console.log('mongodb error!')
})
// connect successfully 
db.once('open', () => {
  console.log('mongodb connected!')
})

// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
// app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));

//設定ejs引擎
app.set('view engine', 'ejs');
app.set('views', 'views');

//公開public檔案
app.use(express.static(path.join(__dirname, 'public')));


//創建登入系統session
const session = require('express-session');
app.use(session({
    secret: 'ThisIsAWordForCertification',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 300000 }  // 5分鐘 
  }));


// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
// 初始化 Passport
app.use(passport.initialize());
// 如果要使用 login session 時需設定
app.use(passport.session());
const runPassport = require('./config/passport');
runPassport(passport);

// const usePassport = require('./controllers/session')
// usePassport(app)

//引用內部(js操作)
const entrance_Routes = require('./routes/entrance');
const admin_Routes = require('./routes/admin');
const user_Routes = require('./routes/user');

console.log('ent:ger');
app.use(entrance_Routes);
app.use('/admin',admin_Routes);
app.use(user_Routes);


app.listen(3000);