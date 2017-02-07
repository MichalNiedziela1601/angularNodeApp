'use strict';

// simple express server
var express = require('express');
var jsonParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var api = require('./routers/api');
var config = require('./config');
var setup = require('./routers/setup');
var auth = require('./routers/auth');
var app = express();
var router = express.Router();


var port = process.env.PORT || 5000;
mongoose.connect(config.database);
app.set('superSecret',config.secret);

router.get('/', function(req, res) {
    res.sendFile(__dirname+'/public/index.html');
});
app.use(jsonParser.json());
app.use(jsonParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use('/',router);
app.use('/auth',auth);
app.use('/api',api);
app.use('/setup',setup);


app.listen(port);
console.log('Server start at port: '+port);
