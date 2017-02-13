var express = require('express');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var Testdata = require('../model/testdata');
var xmlify = require('xmlify');
const config = require('../config');

function byteCount(s)
{
    return encodeURI(s).split(/%..|./).length - 1;
}

function ensureAuthorized(req, res, next)
{
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        jwt.verify(bearerToken, 'superSecret', (err, decoded) =>
        {
            'use strict';
            console.log(bearerToken);
            if (err) {
                return res.sendStatus(401);
            } else {
                next();
            }

        });

    } else {
        res.sendStatus(401);
    }
}

module.exports = (function ()
{
    'use strict';
    var api = express.Router();

    api.get('/testdata/:id', function (req, res)
    {
        Testdata.findOne({
            _id: req.params.id
        }, function (err, testdata)
        {
            if (err) {
                throw err;
            }
            if (testdata.length === 0) {
                return res.sendStatus(404);

            } else {
                return res.json(testdata);
            }
        });

    });

    api.delete('/testdata/:id', function (req, res)
    {
        Testdata.remove({
            _id: req.params.id
        }, function (err)
        {
            if (err) {
                throw err;
            }

            return res.json({success: true, message: 'Testdata removed'});
        });
    });

    api.put('/testdata/:id', function (req, res)
    {
        var id = req.params.id;
        Testdata.findOne({ _id: id}, function(err,testdata){
            if(err) throw err;

            testdata.name = req.body.name;
            testdata.description = req.body.description;

            testdata.save(function(err,data){
                if(err) throw err;

                return res.json(data);
            })
        })

    });

    api.get('/testdata', function (req, res)
    {
        Testdata.find({}, function (err, data)
        {
            if (err) {
                throw err;
            }
            if (req.accepts('json') || req.accepts('text/html')) {
                res.header('Content-Type', 'application/json');
                return res.json(data);
            } else if (req.accepts('application/xml')) {
                res.header('Content-Type', 'text/xml');

                var xml = xmlify(data);
                return res.send(xml);
            }
        });
    });

    api.post('/testdata', function (req, res)
    {
        var data = req.body;
        if (byteCount(JSON.stringify(data)) > 100) {
            return res.sendStatus(413);
        }
        var test = new Testdata({
            name: data.name, description: data.description, created_date: new Date()
        });
        test.save(function (err)
        {
            if (err) {
                throw err;
            }

            return res.sendStatus(201);
        })

    });

    api.get('/users',ensureAuthorized,function (req, res)
    {
        User.find({}, function (err, users)
        {
            if (err) {
                throw err;
            }


            return res.json(users);
        })
    });


    return api;
})();
