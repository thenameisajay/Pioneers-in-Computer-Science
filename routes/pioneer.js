const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer'); // assuming the models directory is at the root level

const router = express.Router();

router.get('/:name', (req, res) => {
  console.log('Pioneer Page has been requested');
  const name = req.params.name; // Retrieve the name parameter from the URL path
  console.log('The name is: ' + name);

  // Find the pioneer in the database and render the pioneer page with the pioneer data

  const formattedName = _.toLower(name.trim().replace(/[-\s]+/g, '[\\s-]*')); // format the name to be used in the regex

  Pioneer.find({
    name: { $regex: new RegExp('.*' + formattedName + '.*', 'i') },
  })
    .exec()
    .then((pioneers) => {
      const pioneer = pioneers[0];
      if (!pioneer) {
        console.log('Pioneer not found');
        res.render('error');
      }
      console.log('The search result was: ' + pioneer);
      res.render(path.join(__dirname, '../views/pioneer.ejs'), {
        pioneer: pioneer,
      }); // css and js files are in the public directory but css is not loading.
    })
    .catch((err) => {
      console.error(err);
      next(err); // pass error to express error handler
      res.redirect('/error');
    });
});

module.exports = router;
