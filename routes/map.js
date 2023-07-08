const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Map page requested.");
    res.render(path.join(__dirname, "../views/map.ejs"));
});


module.exports = router;