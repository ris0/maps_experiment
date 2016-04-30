'use strict';

const express = require('express'),
    router = express.Router(),
    https = require('https'),
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




//router.get('/map', function(req, res, next) {
//    console.log('hitting this route');
//
//     AIzaSyB9mL7bgVP00yOTuq7JEyA4wV0B-vAIyZo
//
//    https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ
//    const mapUrl = 'https://maps.googleapis.com/maps/api/js?key=' + GMAP_API_KEY;
//
//    https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ', function (response) {
//        console.log('hitting this route');
//        var result = '';
//            response.on('data', function(chunk) { result += chunk; });
//            response.on('end', function() { res.json(result); });
//            response.on('error', function(e) { console.log(e); });
//    });
//
//    https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ', function(response) {
//        var result = '';
//        response.on('data', function(chunk) { result += chunk; });
//        response.on('end', function() { res.json(result); });
//        response.on('error', function(e) { console.log(e); });
//    })
//
//});



