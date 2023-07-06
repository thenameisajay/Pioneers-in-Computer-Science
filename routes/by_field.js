const express = require('express');
const router = express.Router();
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level
const _ = require('lodash');



router.get('/', (req, res) => {


   Pioneer.distinct('classification').exec().then(classifications => {
        let classes = [];
        for (let i = 0; i < classifications.length; i++) {
             classes.push(classifications[i]);
        }
        console.log(classes);
        console.log("By Field Page has been requested");
       // res.render(path.join(__dirname, '../views/by_field.ejs'), { classes: classes });
     }).catch(err => {
        console.log(err);
     });    
});






module.exports = router;