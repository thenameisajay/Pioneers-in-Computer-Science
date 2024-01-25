const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // assuming the models directory is at the root level
const path = require("path");

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../views/contact.ejs"));
  console.log("Contact Page has been requested");
});

router.post("/", (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: Date.now(),
  });

  contact
    .save()
    .then(() => {
      console.log("Contact Form Data has been saved to the database");
      res.redirect("/contact");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
