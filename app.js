const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const sqlite3 = require('sqlite3').verbose();
const SQLiteStore = require('connect-sqlite3')(session);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const specialPageRouter = require('./routes/special_page');
const manageAccountRouter = require('./routes/manage_account');
const restUtil = require('./utils/restUtil');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
  secret: 'Itnaa Secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24*7 //One week
  },
  store : new SQLiteStore({
    db: 'ExtinctOrAlive.sqlite',
    dir: './database'
  })
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/special_page', specialPageRouter);
app.use('/manageAccount', manageAccountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.toString());
});

restUtil.addSpeciesToDB();

app.listen(5000, ()=>{
  console.log("Listening on port 5000.");
});

module.exports = app;
