const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level

const router = express.Router();

router.post("/", (req, res, next) => {
  const name = req.body.search;
  const formattedName = _.toLower(name.trim().replace(/[-\s]+/g, "[\\s-]*"));

  Pioneer.find({ name: { $regex: new RegExp(".*" + formattedName + ".*", "i") } })
    .exec()
    .then((pioneers) => {
      if (pioneers && pioneers.length === 1) {
      } else if (pioneers && pioneers.length > 0) {
        const pioneerArray = pioneers.map(pioneer => pioneer);
        res.redirect(`/searchResults?data=${encodeURIComponent(JSON.stringify(pioneerArray))}`); // encode the data to be passed in the url

      } else {
        res.render(path.join(__dirname, '../views/error.ejs'));
      }
    })
    .catch((err) => {
      console.error(err);
      next(err); // pass error to express error handler
    });
});

module.exports = router;
