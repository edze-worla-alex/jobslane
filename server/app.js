var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jobsRouter = require('./routes/jobs');
var uploadRouter = require('./routes/upload');
var app = express();

var cors = require("cors");
app.use(cors());
//database handling
require('./config/database.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/upload', uploadRouter);
app.use('/', usersRouter);
app.use('/jobs', jobsRouter);

module.exports = app;