const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/disclaimer.ejs'));
  console.log('Disclaimer Page has been requested');
});

module.exports = router;
