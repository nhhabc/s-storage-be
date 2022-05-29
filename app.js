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
const folderRouter = require('./routes/folder-router')
const fileRouter = require('./routes/file-router')
const authRouter= require('./routes/auth-router')
const userRouter = require('./routes/user-router')


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
app.use('/' + prefixPath, folderRouter);
app.use('/' + prefixPath, fileRouter);
app.use('/' + prefixPath, authRouter);
app.use('/' + prefixPath, userRouter);

module.exports = app;
