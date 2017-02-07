var express = require('express');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var Testdata = require('../model/testdata');

module.exports = (function ()
{
    'use strict';
    var api = express.Router();

    api.use(function (req, res, next)
    {
        console.log(req.url);
        console.log(req.method);
        if (req.url === '/testdata' && req.method === 'GET') {
            next();
        } else {
            var token = req.body.token || req.query.token || req.headers['x-auth-token'];

            if (token) {
                jwt.verify(token, 'superSecret', function (err, decoded)
                {
                    if (err) {
                        return res.json({success: false, message: 'Failed to authenticate token'})
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                })
            } else {
                return res.status(403).send({
                    success: false, message: 'No token provided'
                })
            }
        }
    });

    api.get('/testdata/:name', function (req, res)
    {
        Testdata.findOne({
            name: req.params.name
        }, function (err, testdata)
        {
            if (err) {
                throw err;
            }

            res.json(testdata);
        });

    });

    api.get('/testdata', function (req, res)
    {
        Testdata.find({}, function (err, data)
        {
            if (err) {
                throw err;
            }

            res.json(data);
        });
    });

    api.post('/testdata', function (req, res)
    {
        var data = req.body;
        var test = new Testdata({
            name: data.name, description: data.description, created_date: new Date()
        });
        console.log(test);
        test.save(function (err)
        {
            if (err) {
                throw err;
            }

            res.sendStatus(200);
        })

    });

    api.get('/users', function (req, res)
    {
        User.find({}, function (err, users)
        {
            if (err) {
                throw err;
            }

            res.json(users);
        })
    });


    return api;
})();
