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

app.set('superSecret', config.secret);


router.get('/', function (req, res)
{
    res.sendFile(__dirname + '/public/index.html');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use('/auth', auth);
app.use('/api', api);
app.use('/register', register);


app.listen(port);
console.log('Server start at port: ' + port);
