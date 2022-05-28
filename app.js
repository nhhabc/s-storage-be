const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Router
const indexRouter = require('./routes/message-router');
const homeRouter = require('./routes/home-router');
const folderRoute = require('./routes/folder-router')
const fileRoute = require('./routes/file-router')
const userRoute = require('./routes/user-router')

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

module.exports = app;
