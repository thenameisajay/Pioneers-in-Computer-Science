const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');
const _ = require('lodash');

router.get('/:classification', (req, res) => {
    const classification = req.params.classification.toLowerCase();
    console.log("Classification searched for is: " + classification);

    //Pagination code
    let page = Number(req.query.page) || 1;
    let pioneersPerPage = 10;
    let skip = (page - 1) * pioneersPerPage; 
     
    // To find all the pioneers that have the classification searched for then render the results to the page
    Pioneer.find({ classification:{ $in:new RegExp(classification, 'i') }}).skip(skip)
    .limit(pioneersPerPage)
    .exec()
    .then((pioneers) => {  
       Pioneer.countDocuments({ classification:{ $in:new RegExp(classification, 'i') }})
         .then((totalPioneers) => {
            res.render('by_field_search', { pioneers: pioneers, classification: classification, totalPioneers: totalPioneers, pioneersPerPage: pioneersPerPage });
        });

    })
    .catch(err => {
        console.error(err);
        res.redirect('/error');
    });
});

module.exports = router;
