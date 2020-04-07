const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

router.post('/login', usersController.getLogin);
router.post('/auth', usersController.getAuth);

module.exports = router;
