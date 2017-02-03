var express = require('express');
var fs = require('fs');

module.exports = (function(){
    'use strict';
    var api = express.Router();

    api.get('/testdata', function(req,res){
        fs.readFile(__dirname+'/data/test.json', 'utf-8', function(err,data){
            console.log(data);
            var obj = JSON.parse(data);
            console.log(obj);
            res.send(obj);
        });

    });

    return api;
})();
