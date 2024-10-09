const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/copyright.ejs'));
  console.log('Copyright Page has been requested');
});

module.exports = router;
