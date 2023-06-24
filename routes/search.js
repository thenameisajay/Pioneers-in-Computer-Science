const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const _ = require('lodash');
const path = require('path');

router.post("/", (req, res) => {
  const name = req.body.search;
  const formattedName = _.toLower(name.trim().replace(/\s+/g, " ")); // Convert to lowercase and replace spaces with underscores to match the search_id

  console.log(`Search Function has been initiated and the query is: ${formattedName}`);

  Pioneer.find({ name: { $regex: ".*" + formattedName + ".*", $options: "i" } })
    .exec()
    .then((pioneers) => {
      if (pioneers && pioneers.length === 1) {
        console.log(`Found 1 pioneer matching the search term: ${pioneers[0].name}`);
        res.render(path.join(__dirname, '../views/pioneer.ejs'), { pioneer: pioneers[0] });
        return;
      } else if (pioneers && pioneers.length > 0) {
        var pioneerArray = [];
        pioneers.forEach((pioneer) => {
          pioneerArray.push(pioneer);
          console.log("Pioneer " + pioneer.name + " has been added to the array.");
          console.log(pioneerArray);
        });
        //TODO: Make the search results page and render the pioneer page based on the user selection.
        // Push the array to the search Results page and based on the user selection, render the pioneer page. so that the user can select the pioneer from the list.
        // res.render(path.join(__dirname, '../views/searchResults.ejs'), {pioneerArray: pioneerArray});
      } else {
        res.render(path.join(__dirname, '../views/error.ejs'));
        console.log("No pioneers found that match the search term.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
