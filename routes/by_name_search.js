const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');
const _ = require('lodash');

router.get("/:alphabet", (req, res) => {
    console.log("Search Results Page has been requested");
    const searchTerm = req.params.alphabet;  // Retrieve the name parameter from the URL path
    console.log("The search term is: " + searchTerm);
    const searchRegex = _.toLower(searchTerm.trim().replace(/[-\s]+/g, "[\\s-]*"));

    let page = Number(req.query.page) || 1;
    let pioneersPerPage = 10;
    let skip = (page - 1) * pioneersPerPage;

    // Find all the pioneers whose names match with the first letter of the alphabet.
    Pioneer.find({ name: { $regex: new RegExp("^" + searchRegex, "i") } })
        .skip(skip)
        .limit(pioneersPerPage)
        .exec()
        .then((pioneers) => {
            // count the total number of pioneers
            Pioneer.countDocuments({ name: { $regex: new RegExp("^" + searchRegex, "i") } })
                .then((totalPioneers) => {
                    console.log("Found " + pioneers.length + " pioneers");
                    res.render("by_name_search", { pioneers: pioneers, alphabet: searchRegex, totalPioneers: totalPioneers, pioneersPerPage: pioneersPerPage });
                });
        })
        .catch((err) => {
            console.log("Error retrieving pioneers");
            res.redirect("/error");
        });
});

module.exports = router;
