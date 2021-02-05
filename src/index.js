const express = require('express');
const cookieParser = require('cookie-parser');

const twitter20 = express();
const cookieSession = require('cookie-session');

const mainRoute = require('./routes/index');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');

twitter20.use(express.json());
twitter20.use(express.urlencoded({ extended: false }));
twitter20.use(cookieParser());

//cookie setup
twitter20.set('trust proxy', 1) // trust first proxy

twitter20.use(cookieSession({
  name: 'session',
  keys: ['username'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//twitter20.use('/', mainRoute);
twitter20.use('/api/users', userRoutes(dbHelper));
twitter20.use('/api/login', loginRoutes(dbHelper));

//catch unregistered routes issue
twitter20.use((req, res, next) => {
  next(createError(404));//call my error handler
});

//my error handler
twitter20.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {'error': err});
});

module.exports = twitter20;