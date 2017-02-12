var express = require('express');
var User = require('../model/user');


module.exports = (function ()
{
    'use strict';
    var register = express.Router();

    register.post('/', function (req, res)
    {
        if(!req.body || req.body.length === 0){
            return res.sendStatus(500);
        } else if(req.body.name === null || req.body.email === null || req.body.password === null){
            return res.json({success: false, message: 'You need fill login, email and password input value'});
        }

        else{
            console.log('login',req.body.login);
            User.find({ login: req.body.login}, (err,user) =>{
                if(err) throw err;
                if(user.length >0){
                    return res.json({success: false, message: 'Login exist. Try different login'});
                } else {
                    var newUser = new User({
                        login: req.body.login,
                        email: req.body.email,
                        password: req.body.password
                    });

                    newUser.save(function(err){
                        if(err) throw err;

                        res.status(200);
                        res.json({ success: true, message: 'Add user to database'});
                    })
                }
            });


        }
    });

    return register;

})();
