const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');
const _ = require('lodash');


router.get("/", (req, res) => {
    res.render(path.join(__dirname, '../views/road_map.ejs'));
    console.log("Road Map Page has been requested");
    
});


module.exports = router;