'use strict';

// simple express server
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');

var api = require('./routers/api');
var config = require('./config');
var register = require('./routers/register');
var auth = require('./routers/auth');
var User = require('./model/user');
var info = require('./routers/info');

var app = express();
var router = express.Router();


var port = process.env.PORT || 5000;
mongoose.connect(config.database);

User.findOne({login: 'administrator', email: 'administrator@example.com', admin: true}, (err, admin) =>
{
    if (err) {
        throw err;
    }
    if (!admin) {
        const admin = new User({
            login: 'administrator', email: 'administrator@example.com', password: 'zaq1@WSX', admin: true
        });
        admin.save((err) =>
        {
            if(err) throw err;
        })
    }

});

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

app.set('superSecret', config.secret);




app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(compression({ filter: shouldCompress}));
app.use('/auth', auth);
app.use('/api', api);
app.use('/register', register);
app.use('/info',info);

module.exports = function(){
    app.listen(port);
    console.log('Server start at port: ' + port);
};

