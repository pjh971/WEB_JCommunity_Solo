const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// added modules
const cors = require('cors');
const cfg = require('../config');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../fe', 'dist')));
if (process.env.NODE_ENV !== 'production'){
  app.use(cors()); // 8080과 3000이 같이 구동되기 위해 필요
}

//routes connection
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message });
});

//mongoDB connection
mongoose.connect(cfg.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) return console.error(err);
  console.log('mongoose connected!');
});

//mode log 
console.log(`${process.env.NODE_ENV} started!`); //export NODE_ENV=production or NODE_ENV=development

module.exports = app;