const express = require('express');
const router = express.Router();
const treasureControleer = require('../controller/treasure.controller');
const ensureAuthenticated = require('../middlewares/authorization');
const { uploadImg } = require('../middlewares/uploadImg');

router.get('/', ensureAuthenticated, (req, res) => {
  res.json({ result: 'respond GET with a treasures resource' });
});

router.post('/', ensureAuthenticated, uploadImg.array('img', 3), treasureControleer.saveTreasures);

module.exports = router;
