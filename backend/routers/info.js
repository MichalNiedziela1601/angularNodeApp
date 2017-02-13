/**
 * Created by sunday on 2/12/17.
 */
const express = require('express');
var cookieParser = require('cookie-parser');
module.exports = (()=>
{
    let info = express.Router();
    info.use(cookieParser());
    info.get('/', (req, res) =>
    {
        'use strict';

        return res.json(req.headers);
    });

    info.get('/setcookie', (req,res) => {
        'use strict';
        res.cookie('name','nodeApp');
        res.end();
    });

    info.get('/getcookie', (req,res) => {
        'use strict';
        console.log(req.cookie);
        res.json(req.cookies);
    });


    return info;

})();
