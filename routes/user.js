const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const { addUser, createUserProfile } = require('../controllers/addUser');

router.post('/addUser', addUser);
router.post('/createUserProfile', isAuthenticated, createUserProfile);

module.exports = router;