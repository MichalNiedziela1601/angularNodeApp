var express = require('express');
var User = require('../model/user');
var jwt = require('jsonwebtoken');

module.exports = (function(){
    'use strict';
    var auth = express.Router();
    auth.post('/', function(req,res){

        User.findOne({
            name: req.body.name
        }, function(err,user){
            if(err) throw err;

            if(!user){
                res.json({ success: false, message : 'Authenticate failed! User not found'});
            } else if(user){

                if(user.password != req.body.password){
                    res.json({ success: false, message : 'Authenticate failed! Wrong password'});
                } else {
                    var token = jwt.sign(user, 'superSecret', {
                        expiresIn: 60*20
                    });

                    res.json({
                        success: true,
                        message: 'You are logged',
                        token: token
                    });
                }

            }

        })
    });

    return auth;

})();
