const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

router.post('/login', usersController.getLoginOrSignup);
router.post('/auth', usersController.getAuth);

module.exports = router;
