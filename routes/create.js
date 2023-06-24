const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level


// Create Page Backend Code is here.

router.get("/", (req, res) => {
  const pioneer = new Pioneer({
    year: 830,
    century: 9,
    name: "Al-Khwarizmi",
    achievement: "The term algorithm is derived from the algorism, the technique of performing arithmetic with Hindu-Arabic numerals popularised by al-Khwarizmi in his book \"On the Calculation\" with Hindu Numerals.",
    classification: ["algorithms", "computation theory"],
    wikiUrl: "https://en.wikipedia.org/wiki/Muhammad_ibn_Musa_al-Khwarizmi",
    birthCountry: "Khwarizm",
    image: "https://uwaterloo.ca/math/sites/ca.math/files/resize/uploads/images/al-khwarizmi_portrait-250x361.jpeg",
    latitude: 41.377491,
    longitude: 60.365830,
});

  
  pioneer
    .save()
    .then(() => console.log("Pioneer Data has been saved to the database"))
    .catch((err) => console.log(err));

  res.redirect("/");
  console.log("Pioneer Page has been requested and the pioneer is " + pioneer.name + ".");
});

module.exports = router;
