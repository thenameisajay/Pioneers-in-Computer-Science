const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.route("/search").post((req, res) => {
  const name = req.body.search;
  console.log(`Search Function has been initiated and the query is: ${name}`);
  res.redirect("/"); // Redirect to home page for now , until the data collection is done and react is implemented.
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
