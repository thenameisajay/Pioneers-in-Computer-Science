const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../views/accessibility.ejs"));
  console.log("Acessibility Statement Page has been requested");
});

module.exports = router;
