const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.redirect('/error');
});

module.exports = router;
