const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');
const _ = require('lodash');


router.get("/", (req, res) => {

 // Retrieve all pioneers (name,year,century,achievement) frpm the database
 Pioneer.find({}).then(pioneers => {
    // Sort the pioneers by year
    pioneers = _.sortBy(pioneers, ['year']);
    // Render the road map page and pass the pioneers data to it
    res.render(path.join(__dirname, '../views/road_map.ejs'), { pioneers: pioneers });
}).catch(err => {
    console.log(err);
});
});

module.exports = router;