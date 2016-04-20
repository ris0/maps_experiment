'use strict';
var router = require('express').Router();

router.use('/map', require('./map'));
router.use(function (req, res) { res.status(404).end(); });

module.exports = router;



