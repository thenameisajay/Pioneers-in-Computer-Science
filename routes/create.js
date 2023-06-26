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

  const pioneer2 = new Pioneer({
    year: 1936,
    century: 20,
    name: "Alan Turing",
    achievement: "Made several fundamental contributions to theoretical computer science, including the Turing machine computational model, the conceiving of the stored program concept and the designing of the high-speed ACE design. Independently of Alonzo Church, he formulated the Church-Turing thesis and proved that first-order logic is undecidable. He also explored the philosophical issues concerning artificial intelligence, proposing what is now known as Turing test.",
    classification: ["algorithms", "computation theory", "computer science", "artificial intelligence"],
    wikiUrl: "https://en.wikipedia.org/wiki/Alan_Turing",
    birthCountry: "United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg",
    latitude: 51.507351,
    longitude: -0.127758,
  });


  pioneer
    .save()
    .catch((err) => console.log(err));

  pioneer2.save().catch((err) => console.log(err));

  console.log("Pioneers saved successfully");


  res.redirect("/");
});

module.exports = router;
