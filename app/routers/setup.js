var express = require('express');
var User = require('../model/user');


module.exports = (function ()
{
    'use strict';
    var register = express.Router();

    register.post('/', function (req, res)
    {
        console.log(req.body.name);
        if(!req.body || req.body.length === 0){
            console.log("request body not found");
            return res.sendStatus(500);
        }else{
            var user = new User({
                name: req.body.name,
                password: req.body.password
            });

            user.save(function(err){
                if(err) throw err;

                res.status(200);
                res.json({ success: true, message: 'Add user to database'});
            })
        }
    });

    return register;

})();
