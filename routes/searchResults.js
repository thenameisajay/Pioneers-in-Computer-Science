const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const _ = require('lodash');




router.get("/", function (req, res) {
    console.log("Search Results Page has been requested");
    res.render(path.join(__dirname, '../views/searchResults.ejs'), { pioneerArray: JSON.parse(decodeURIComponent(req.query.data)) });
});

module.exports = router;