const express = require('express');
const router = express.Router();

const addVendor = require('../controllers/addVendor');

// required fields: displayName
// optional fields: photoURL, address
// if address is provided
router.post('/addVendor', addVendor);

module.exports = router;