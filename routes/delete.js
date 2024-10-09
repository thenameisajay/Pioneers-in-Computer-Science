const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer'); // assuming the models directory is at the root level

// Delete All Pioneers Backend Code is here.

router.get('/', (req, res) => {
  Pioneer.deleteMany({})
    .then(() =>
      console.log('All Pioneer Data has been deleted from the database'),
    )
    .catch((err) => console.log(err));

  res.redirect('/');
  console.log(
    'Pioneer Page has been requested and all pioneers have been deleted.',
  );
});

module.exports = router;
