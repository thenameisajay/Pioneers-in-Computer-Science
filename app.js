require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
  console.log("Home Page has been requested");
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

// Initializing the database connection
mongoose.connect(process.env.MONGO_URL_CONTACT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creating the database schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Creating the database model
const Contact = mongoose.model("Contact", contactSchema);

app
  .route("/contact")
  .get((req, res) => {
    res.render(__dirname + "/views/contact.ejs");
    console.log("Contact Page has been requested");
  })
  .post((req, res) => {
    // Creating the database document
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    contact
      .save()
      .then(() => {
        console.log("Contact Form Data has been saved to the database");
        res.redirect("/contact");
      })
      .catch((err) => console.log(err));
  });

// About Page Backend Code is here.

app.route("/about").get((req, res) => {
  res.render(__dirname + "/views/about.ejs");
  console.log("About Page has been requested");
});

// Opening the server on port 3000 and logging the port number to the console.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
