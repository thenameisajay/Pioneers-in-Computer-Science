const express = require('express');
const router = express.Router();
const path = require('path');

router
  .route("/")
  .get((req, res) => {
    res.render(path.join(__dirname, '../views/by_name.ejs'));
    console.log("By Name Page has been requested");
  })
  .post((req, res) => {
    // Capture the button press and log it to the console
    let alphabet = "";
    for (let key in req.body) {
      console.log(`Button ${key} was pressed.`);
      alphabet = key;
    }
    // TODO: Redirect the user to the page with the alphabet as the query
  });

module.exports = router;
