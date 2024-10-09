const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');
const _ = require('lodash');

router.get('/:country', (req, res) => {
  console.log('Search Results Page has been requested');
  const searchTerm = req.params.country; // Retrieve the name parameter from the URL path
  console.log('The search term is: ' + searchTerm);

  // Pagination code
  let page = Number(req.query.page) || 1;
  let pioneersPerPage = 10;
  let skip = (page - 1) * pioneersPerPage;

  // Find all the pioneers with the same birth country.

  Pioneer.find({ birthCountry: { $regex: new RegExp('^' + searchTerm, 'i') } })
    .skip(skip)
    .limit(pioneersPerPage)
    .exec()
    .then((pioneers) => {
      // count the total number of pioneers
      Pioneer.countDocuments({
        birthCountry: { $regex: new RegExp('^' + searchTerm, 'i') },
      }).then((totalPioneers) => {
        res.render('by_country_search', {
          pioneers: pioneers,
          country: searchTerm,
          totalPioneers: totalPioneers,
          pioneersPerPage: pioneersPerPage,
        });
      });
    })
    .catch((err) => {
      console.log('Error retrieving pioneers');
      res.redirect('/error');
    });
});

module.exports = router;
