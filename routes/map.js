const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer'); // assuming the models directory is at the root level
const { Console } = require('console');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const api_key = process.env.API_KEY;
  console.log('Map page requested.');
  //Find all the pioneers in the database
  // Find all the pioneers in the database
  Pioneer.find({})
    .then((pioneers) => {
      res.render('map', {
        pioneers: pioneers,
        api_key: api_key,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});

module.exports = router;
