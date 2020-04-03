const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

router.post('/login', usersController.getLogin);

module.exports = router;
