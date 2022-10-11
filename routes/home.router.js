const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ESTE ES EL HOME');
});

module.exports = router;
