const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level


// Create Page Backend Code is here.

router.get("/", (req, res) => {
  const pioneer = new Pioneer({
    name: "Alan Turing",
    description:
      "Alan Mathison Turing OBE FRS was an English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg",
    link: "https://en.wikipedia.org/wiki/Alan_Turing",
  });
  
  pioneer
    .save()
    .then(() => console.log("Pioneer Data has been saved to the database"))
    .catch((err) => console.log(err));

  res.redirect("/");
  console.log("Pioneer Page has been requested and the pioneer is " + pioneer.name + ".");
});

module.exports = router;
