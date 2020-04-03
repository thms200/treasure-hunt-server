const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ result: 'respond with a treasures resource' });
});

module.exports = router;
