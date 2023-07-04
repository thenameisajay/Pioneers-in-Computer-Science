const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const _ = require('lodash');

let pioneerArray = []; // global variable to store the search results

router
  .route("/")
  .get((req, res) => {
    res.render(path.join(__dirname, '../views/by_name.ejs'));
    console.log("By Name Page has been requested");
  })
  .post((req, res) => {
    // Capture the button press and log it to the console
    let alphabet = "";
    for (let key in req.body) {
      console.log(`Button ${key} was pressed.`);
      alphabet = key;
    }
    // Search in the database for all names that start with the letter that was pressed
    Pioneer.find({ Name: { $regex: new RegExp("^" + alphabet, "i") } }).exec()
      .then((pioneers) => {
        if (pioneers && pioneers.length > 0) {
        pioneerArray = pioneers.map(pioneer => pioneer);
        console.log("The search result was: " + pioneerArray);
        res.redirect(`/searchResults?data=${encodeURIComponent(JSON.stringify(pioneerArray))}`); // encode the data to be passed in the url
        } else {
          res.render(path.join(__dirname, '../views/error.ejs'));
        }
      })
      .catch((err) => {
        console.error(err);
        next(err); // pass error to express error handler
      });
  });


module.exports = router;
