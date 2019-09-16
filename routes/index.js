const express = require('express');
const router = express.Router();
const memories = require('./memories');

router.get('/', (req, res) => {
  res.render('index');
});

router.use('/memories', memories);

module.exports = router;
