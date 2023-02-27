const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');
const { clanName, minAdminAccess, COOKIES_SECRET, APP_LOCALE } = require('./config');
const getErrorMessageByStatusCode = require('./utils/getErrorMessageByStatusCode');
const compression = require('compression');
const minify = require('express-minify');
require('express-async-errors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// template basedir
app.locals.basedir = path.join('views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIES_SECRET));
app.use(compression({ level: 9 }));
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
  locales: [ APP_LOCALE ],
  directory: path.join(__dirname, '/locales'),
  cookie: '',
  defaultLocale: APP_LOCALE,
});

// set globals
app.locals.__ = word => i18n.__(word);
app.locals.clanName = clanName;
app.locals.minAdminAccess = minAdminAccess;

app.use('/', require('./routes/index'));
app.use('/member', require('./routes/member'));
app.use('/admin', require('./routes/admin'));
app.use('/promotions', require('./routes/promotions'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if(req.headers.accept == 'application/json')
    return res.status(400).json({ msg: err.message });

  // set locals, only providing error in development
  res.locals.message = getErrorMessageByStatusCode(err.response.status);
  res.locals.error = req.app.get('env') === 'development' ? err : null;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
