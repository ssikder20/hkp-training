var express = require('express');
var router = express.Router();

// Grab handlers for routes
let landing = require('../controllers/landing');

/* GET home page. */
router.get('/', landing.get_landing); // Home page
router.post('/', landing.submit_lead); // Email form

module.exports = router;
