const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const twitter20 = express();
const port = 3000;
const cookieSession = require('cookie-session');

const db = require('../db');
const dbHelper = require('./helpers/dbHelper')(db);

// const mainRoute = require('./routes/index');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoute = require('./routes/logout');
const signupRoutes = require('./routes/signup');
const tweetRoutes = require('./routes/tweets');

twitter20.use(express.json());
twitter20.use(express.urlencoded({ extended: false }));
twitter20.use(cookieParser());

// cookie setup
twitter20.set('trust proxy', 1); // trust first proxy

twitter20.use(cookieSession({
  name: 'session',
  keys: ['username'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

// twitter20.use('/', mainRoute);
twitter20.use('/users', userRoutes(dbHelper));
twitter20.use('/login', loginRoutes(dbHelper));
twitter20.use('/logout', logoutRoute());
twitter20.use('/signup', signupRoutes(dbHelper));
twitter20.use('/tweets', tweetRoutes(dbHelper));

// catch unregistered routes issue
twitter20.use((req, res, next) => {
  if (!req.user) {
    return next(createError(404, 'Cannot find resource.'));// call my error handler
  }
  next();
});

// my error handler
twitter20.use((err, req, res) => {
  console.log('myerror handler');
  res.status(err.status || 500);
  res.render('error', {error: err});
});

twitter20.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

twitter20.on('close', () => {
  console.log('server closed');
});
module.exports = twitter20;
