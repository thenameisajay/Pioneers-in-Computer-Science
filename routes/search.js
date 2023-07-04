const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const router = express.Router();



// Get the search term from the search box
router.post("/", (req, res, next) => {
  const searchTerm = req.body.search;  // Retrieve the search term from the form
  res.redirect("/searchResults/" + searchTerm); // redirect to the search page
});




module.exports = router;
