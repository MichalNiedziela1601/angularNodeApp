var express = require('express');
var User = require('../model/user');

module.exports = (function ()
{
    'use strict';
    var setup = express.Router();

    setup.get('/', function (req, res)
    {
        var michal = new User({
            name: 'michal', password: 'zaq1@WSX', admin: true
        });

        michal.save(function (err)
        {
            if (err) {
                throw err;
            }

            console.log('User succesfully saved');
            res.json({success: true});
        });
    });

    return setup;

})();
