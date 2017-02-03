'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

router.get('/test', function(req,res){
    res.send('I am in test page');
});
app.use(express.static(__dirname+'/public'));
app.use('/',router);
app.get('/', function(req, res) {
    res.sendfile(__dirname+'/public/index.html');
});

app.listen(5000, function ()
{
    console.log('Server rt');
});
