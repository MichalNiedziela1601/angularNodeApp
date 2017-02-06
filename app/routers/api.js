var express = require('express');
var fs = require('fs');
var db = require('./data/testData');


module.exports = (function ()
{
    'use strict';
    var api = express.Router();

    api.get('/testdata', function (req, res)
    {
        fs.readFile(__dirname + '/data/test.json', 'utf-8', function (err, data)
        {
            var obj = JSON.parse(data);
            res.send(obj);
        });

    });

    api.post('/testdata', function (req, res)
    {
        var data = req.body;
        console.log('post', data);

        db.save('tes', data).then(function (result)
        {
            res.end(result);
        })
                .catch(function (error)
                {
                    if (error === 'Ivalid type') {
                        res.status(413);
                        res.end();
                    }
                    if (error === 'Entity not found') {
                        res.status(404);
                        res.end();
                    }
                });

    });

    return api;
})();
