const express = require("express");
const router = express.Router();
const path = require("path");
const Pioneer = require("../models/pioneer");
const _ = require("lodash");

router.get("/:searchTerm", (req, res) => {
  console.log("Search Results Page has been requested");
  const searchTerm = req.params.searchTerm; // Retrieve the name parameter from the URL path
  console.log("The search term is: " + searchTerm);
  const searchRegex = _.toLower(
    searchTerm.trim().replace(/[-\s]+/g, "[\\s-]*"),
  );

  let page = Number(req.query.page) || 1; // Fetch page number from query parameters, default to 1
  let pioneersPerPage = 10; // You can adjust this value according to your needs
  let skip = (page - 1) * pioneersPerPage;

  // Find all the pioneers whose names match the search term
  Pioneer.find({ name: { $regex: new RegExp(".*" + searchRegex + ".*", "i") } })
    .skip(skip)
    .limit(pioneersPerPage)
    .exec()
    .then((pioneers) => {
      // Count total pioneers matching the search term for pagination
      Pioneer.countDocuments({
        name: { $regex: new RegExp(".*" + searchRegex + ".*", "i") },
      }).then((totalPioneers) => {
        console.log("Found " + pioneers.length + " pioneers");
        res.render("searchResults", {
          pioneers: pioneers,
          searchTerm: searchTerm,
          totalPioneers: totalPioneers,
          pioneersPerPage: pioneersPerPage,
        });
      });
    })
    .catch((err) => {
      console.log("Error retrieving pioneers");
      res.render("error");
    });
});

module.exports = router;
