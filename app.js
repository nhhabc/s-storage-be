var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/message-router');
const homeRouter = require('./routes/home-router');
const folderRoute = require('./routes/folder-router')
const fileRoute = require('./routes/file-router')
const userRoute = require('./routes/user-router')
const mongoose = require("mongoose");
const cors = require("cors");

var app = express();

// dotenv
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Moongoose
mongoose.connect("mongodb://localhost:27017/s-storage", { user: "", pass: "", useNewUrlParser: true, useUnifiedTopology: true }, err => {
  console.log(err)
});

// CORS
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  }

}));

const prefixPath = process.env.PREFIX_PATH ? process.env.PREFIX_PATH + "/" : "";

app.use('/' + prefixPath, homeRouter);
app.use('/' + prefixPath, indexRouter);
app.use('/' + prefixPath, folderRoute);
app.use('/' + prefixPath, fileRoute);
app.use('/' + prefixPath, userRoute);


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
  res.render('error');
});

module.exports = app;
