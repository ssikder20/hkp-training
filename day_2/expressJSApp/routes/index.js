var express = require('express');
var router = express.Router();

// Grab handlers for routes
let index = require('../controllers/index.js');

/* GET home page. */
router.get('/', index.index);

module.exports = router;
