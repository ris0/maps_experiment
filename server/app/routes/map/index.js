'use strict';

const express = require('express'),
    router = express.Router(),
    https = require('https'),
    request = require('request'),
    env = require('../../../env/development.js');

router.get('/zip', function (req, res) {
    const input = env.ZIP_JSON;
    request(input, function (error, response, body) {
      res.json(body);
    })
});

router.get('/map', function(req, res, next) {
    //console.log('hitting this route');

    // AIzaSyB9mL7bgVP00yOTuq7JEyA4wV0B-vAIyZo

    //https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ
    //const mapUrl = 'https://maps.googleapis.com/maps/api/js?key=' + GMAP_API_KEY;

    //https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ', function (response) {
    //    console.log('hitting this route');
    //    var result = '';
    //        response.on('data', function(chunk) { result += chunk; });
    //        response.on('end', function() { res.json(result); });
    //        response.on('error', function(e) { console.log(e); });
    //});

    //https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgiZ3zMWeuHDa3IToFMtdgn3vu-BxRJXQ', function(response) {
    //    var result = '';
    //    response.on('data', function(chunk) { result += chunk; });
    //    response.on('end', function() { res.json(result); });
    //    response.on('error', function(e) { console.log(e); });
    //})

});

module.exports = router;

