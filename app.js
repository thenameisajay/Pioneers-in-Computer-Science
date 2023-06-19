const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();





app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.route("/search").post((req, res) => {
  const name = req.body.search;
  if (name === "") {
    console.log("Search Function has been initiated but the query is empty");
    res.redirect("/"); // Redirect to home page for now , until the data collection is done and react is implemented.
    return;
  } else {
    console.log(`Search Function has been initiated and the query is: ${name}`);
    res.redirect("/"); // Redirect to home page for now , until the data collection is done and react is implemented.
  }
});

// Contact Page Backend Code is here.

app.route("/contact").get((req, res) => {
  res.render(__dirname + "/views/contact.ejs");
  console.log("Contact Page has been requested");
}).post((req, res) => {











  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  console.log(`Name: ${name} Email: ${email} Message: ${message}`);
  res.redirect("/contact");
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


