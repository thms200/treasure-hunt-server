const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

router.post('/login', usersController.getLoginOrSignup);
router.post('/auth', usersController.getAuth);
router.get('/:user_id/treasures', usersController.getUserTreasures);
router.get('/:user_id/huntings', usersController.getUserHuntings);

module.exports = router;
