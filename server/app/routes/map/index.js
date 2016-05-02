'use strict';

const express = require('express'),
    router = express.Router(),
    http = require('http'),
    request = require('request'),
    path = require('path'),
    rootPath = path.join(__dirname, '../../../'),
    zipCodes = require(path.join(rootPath, './db/zipcodes.json'));

router.get('/zip', (req, res) => {
    let result = [];
    zipCodes.forEach( el => result.push(el.PostalCode) );
    res.send(result);
});

module.exports = router;
