const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const _ = require('lodash');


router.get("/:alphabet", (req, res) => {
    console.log("Search Results Page has been requested");
    const searchTerm = req.params.alphabet;  // Retrieve the name parameter from the URL path
    console.log("The search term is: " + searchTerm);
    const searchRegex = _.toLower(searchTerm.trim().replace(/[-\s]+/g, "[\\s-]*"));

    // Find all the pioneers whose names match with the first letter of the alphabet.
    Pioneer.find({ Name: { $regex: new RegExp("^" + searchRegex, "i") } }).exec().then((pioneers) => {
        console.log("Found " + pioneers.length + " pioneers");
        res.render("by_name_search", { pioneers: pioneers, alphabet: searchRegex });
    }).catch((err) => {
        console.log("Error retrieving pioneers");
        res.redirect("/error");

    }
    );
});



module.exports = router;