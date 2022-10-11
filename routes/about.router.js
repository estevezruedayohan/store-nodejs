const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ABOUT US');
  // res.json('ABOUT US');
});

module.exports = router;
