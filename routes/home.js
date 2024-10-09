const express = require('express');
const router = express.Router();
const path = require('path');

// Home Page Backend Code is here.
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/index.ejs'));
  console.log('Home Page has been requested');
});

module.exports = router;
