const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer'); // assuming the models directory is at the root level
const _ = require('lodash');

router
  .route('/')
  .get((req, res) => {
    // Find all the pioneer birth countries in the database and add them to an array called countries (no duplicates).

    Pioneer.distinct('birthCountry')
      .exec()
      .then((birthCountries) => {
        let countries = [];
        for (let i = 0; i < birthCountries.length; i++) {
          countries.push(birthCountries[i]);
        }
        console.log(countries);
        console.log('By Country Page has been requested');
        res.render(path.join(__dirname, '../views/by_country.ejs'), {
          countries: countries,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post((req, res) => {
    // Capture the button press and log it to the console
    let country = '';
    for (let key in req.body) {
      console.log(`Button ${key} was pressed.`);
      country = key;
    }
    // Send the alphabet to as a parameter to the search function
    res.redirect('/by_country_search/' + country);
  });

module.exports = router;
