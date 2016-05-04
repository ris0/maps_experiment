'use strict';

var express = require('express'),
    router = express.Router(),
    http = require('http'),
    path = require('path'),
    rootPath = path.join(__dirname, '../../../'),
    zipCodes = require(path.join(rootPath, './db/zipcodes.json'));

router.get('/zip', function(req, res) {
    var result = [];
    zipCodes.forEach(function(el) { result.push(el.PostalCode) });
    res.send(result);
});

module.exports = router;
