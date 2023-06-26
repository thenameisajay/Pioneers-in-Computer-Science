const express = require('express');
const _ = require('lodash');
const path = require('path');
const Pioneer = require('../models/pioneer');  // assuming the models directory is at the root level

const router = express.Router();


router.get("/:name", (req, res, next) => {
    console.log("Pioneer Page has been requested");

    const name = req.params.name;

    const formattedName = _.toLower(name.trim().replace(/[-\s]+/g, "[\\s-]*"));

    Pioneer.find({ name: { $regex: new RegExp(".*" + formattedName + ".*", "i") } })
        .then((pioneer) => {
            if (!pioneer) {
                res.render(path.join(__dirname, '../views/error.ejs'), { message: 'Pioneer not found' });
            } else {
                res.render(path.join(__dirname, '../views/pioneer.ejs'), { pioneer });
            }
        })
        .catch((err) => {
            console.error(err);
            next(err); // pass error to express error handler
        });

});

module.exports = router;