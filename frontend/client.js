
'use strict';

var express = require('express');
var http = require('http');
var config = {
    port: process.env.PORT || 8080,
};
var app = express();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use('/', express.static(__dirname + '/public'));

app.get('*', function (req, res)
{
    res.sendFile(__dirname + '/public/index.html');
});

var httpListener = http.createServer(app).listen(config.port, function(){
    console.log('listening on port '+ httpListener.address().port);
});
