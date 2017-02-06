'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();
var api = require('./routers/api');
var jsonParser = require('body-parser');


app.use(jsonParser.json());
app.use(jsonParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use('/',router);
app.use('/api',api);
app.get('/', function(req, res) {
    res.sendfile(__dirname+'/public/index.html');
});

app.listen(5000, function ()
{
    console.log('Server start');
});
