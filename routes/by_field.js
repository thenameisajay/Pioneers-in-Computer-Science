const express = require("express");
const router = express.Router();
const path = require("path");
const Pioneer = require("../models/pioneer"); // assuming the models directory is at the root level
const _ = require("lodash");

router
  .get("/", (req, res) => {
    Pioneer.distinct("classification")
      .exec()
      .then((classifications) => {
        let classes = [];
        for (let i = 0; i < classifications.length; i++) {
          classes.push(classifications[i]);
        }
        // To sort,remove duplicates and clean the array
        let uniqueClasses = new Set();
        classes.forEach((element) => {
          let subjects = element.split(",");
          subjects.forEach((subject) => {
            uniqueClasses.add(subject.trim().replace(/['“”]/g, ""));
          });
        });

        let uniqueClassArray = Array.from(uniqueClasses);
        // Capitalize the first letter of each word
        uniqueClassArray = uniqueClassArray.map((element) => {
          let words = element.split(" ");
          let capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          });
          return capitalizedWords.join(" ");
        });
        uniqueClassArray.sort();
        console.log(uniqueClassArray);

        console.log("By Field Page has been requested");
        res.render(path.join(__dirname, "../views/by_field.ejs"), {
          classifications: uniqueClassArray,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post("/", (req, res) => {
    let classification = "";
    for (let key in req.body) {
      console.log(`Button ${key} was pressed.`);
      classification = key;

      // Send the classification to as a parameter to the search function
      res.redirect("/by_field_search/" + classification);
    }
  });

module.exports = router;
