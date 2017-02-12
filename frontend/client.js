
'use strict';

var express = require('express');
var http = require('http');
var config = {
    port: process.env.PORT || 8080,
};
var app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('*', function (req, res)
{
    res.sendFile(__dirname + '/public/index.html');
});

var httpListener = http.createServer(app).listen(config.port, function(){
    console.log('listening on port '+ httpListener.address().port);
});
