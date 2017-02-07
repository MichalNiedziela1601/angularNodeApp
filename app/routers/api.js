var express = require('express');
var fs = require('fs');
var db = require('./data/testData');


module.exports = (function ()
{
    'use strict';
    var api = express.Router();

    api.get('/testdata/:id', function (req, res)
    {
       db.get('test',req.params.id).then(function(result){
           res.status(200).send(result);
       })

    });

    api.get('/testdata', function (req, res)
    {
        db.getAll().then(function(result){
            res.status(200).send(result);
        }).catch(function(err){
            res.status(404);
            res.headers('content-type','text/html')
            res.end('error');
        });
    });

    api.post('/testdata', function (req, res)
    {
        var data = req.body;
        db.save('test', data).then(function (result)
        {
            res.status(200).send(result);
        })
                .catch(function (error)
                {
                    if (error == 'Invalid type') {
                        console.log('Invalid');
                        res.status(400);
                        res.headers('content-type','text/html');
                        res.end('error');
                    }
                    if (error == 'Entity not found') {
                        res.status(404);
                        res.set('content-type','text/html');
                        res.end('error');
                    }
                });

    });

    return api;
})();
