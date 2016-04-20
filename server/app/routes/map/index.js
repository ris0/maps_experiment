'use strict';

var express = require('express'),
    router = express.Router(),
    https = require('https');

router.get('/map', function(req, res, next) {

    https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ', function(response) {
        var result = '';
        response.on('data', function(chunk) { result += chunk; });
        response.on('end', function() { res.json(result); });
        response.on('error', function(e) { console.log(e); });
    })

});

module.exports = router;

