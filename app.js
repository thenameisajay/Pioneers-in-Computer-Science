require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");
const _ = require('lodash');


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initializing the database connection
try {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connection has been established");
} catch (err) {
  console.log(err);
  process.exit(1);
}

//
app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
  console.log("Home Page has been requested");
});

// Search Function (Main) Backend Code is here.

app.route("/search").post((req, res) => {
  // Assuming you receive the search term from the frontend in a variable called search
  const name = req.body.search;
  const formattedName = _.toLower(_.replace(name, ' ', '_'));
  console.log(`Search Function has been initiated and the query is: ${formattedName}`);
  // To find the data in the database and render it to the page
  Pioneer.findOne({ name: "Alan Turing" }).exec() // ok this is a static value at the moment due to the fact that the name is hardcoded.
  .then((pioneer) => {
    if (pioneer) {
      res.render(__dirname + "/views/pioneer.ejs", { pioneer: pioneer });
      console.log("Pioneer Page has been requested and the pioneer is " + pioneer.name + ".");
    } else {

     // res.render(__dirname + "/views/not_found.ejs");
      console.log("Not Found Page has been requested");
    }
  })
  .catch((err) => {
    console.log(err);
  });

});

// Create a new Schema for the database
const pioneerSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  link: String,
});

// Create a new model for the database
const Pioneer = mongoose.model("Pioneer", pioneerSchema);




// Create a static data for pioneer page for example and customise purpose for the frontend.

app.route("/alan_turing").get((req, res) => {
  const pioneer = new Pioneer({
    name: "Alan Turing",
    description:
      "Alan Mathison Turing OBE FRS was an English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg",
    link: "https://en.wikipedia.org/wiki/Alan_Turing",
  });
  pioneer
    .save()
    .then(() => console.log("Pioneer Data has been saved to the database"))
    .catch((err) => console.log(err));
  res.render(__dirname + "/views/pioneer.ejs", { pioneer: pioneer });
  console.log(
    "Pioneer Page has been requested and the pioneer is " + pioneer.name + "."
  );
});

// Contact Page Backend Code is here.

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

// By Name Page Backend Code is here.

app
  .route("/by_name")
  .get((req, res) => {
    res.render(__dirname + "/views/by_name.ejs");

    console.log("By Name Page has been requested");
  })
  .post((req, res) => {
    // Capture the button press and log it to the console
    const alphabet = "";
    for (let key in req.body) {
      console.log(`Button ${key} was pressed.`);
      alphabet = key;
    }
    // TODO: Redirect the user to the page with the alphabet as the query
  });

// Opening the server on port 3000 and logging the port number to the console.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
