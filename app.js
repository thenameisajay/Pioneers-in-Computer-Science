require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");
const _ = require("lodash");
const Contact = require("./models/contact");
const Pioneer = require("./models/pioneer");

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
  const formattedName = _.toLower(name.trim().replace(/\s+/g, " ")); // Convert to lowercase and replace spaces with underscores to match the search_id
  console.log(
    `Search Function has been initiated and the query is: ${formattedName}`
  );
  Pioneer.find({ name: { $regex: ".*" + formattedName + ".*", $options: "i" } })
    .exec()
    .then((pioneers) => {
      if (pioneers && pioneers.length === 1) {
        console.log(
          `Found 1 pioneer matching the search term: ${pioneers[0].name}`
        );
        res.render(__dirname + "/views/pioneer.ejs", { pioneer: pioneers[0] });
        return;
      } else if (pioneers && pioneers.length > 0) {
        var pioneerArray = [];
        pioneers.forEach((pioneer) => {
          pioneerArray.push(pioneer);
          console.log(
            "Pioneer " + pioneer.name + " has been added to the array."
          );
          console.log(pioneerArray);
        });
        //TODO: Make the search results page and render the pioneer page based on the user selection.
        // Push the array to the search Results page and based on the user selection, render the pioneer page. so that the user can select the pioneer from the list.
        // res.render(__dirname + "/views/searchResults.ejs", {pioneerArray: pioneerArray});
      } else {
        res.render(__dirname + "/views/error.ejs");
        console.log("No pioneers found that match the search term.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});



// Create a static data for pioneer page for example and customise purpose for the frontend.

app.route("/create").get((req, res) => {
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
  res.redirect("/");
  console.log(
    "Pioneer Page has been requested and the pioneer is " + pioneer.name + "."
  );
});

// const NUM_PIONEERS = 100;

// app.get('/create', (req, res) => {
//   let savedPioneers = 0;

//   // Create pioneers in a loop
//   for(let i = 0; i < NUM_PIONEERS; i++) {
//     const pioneer = new Pioneer({
//       search_id: faker.string.uuid(),
//       name: faker.internet.userName(),
//       description: faker.lorem.paragraph(),
//       image: faker.image.avatar(),
//       link: faker.internet.url(),
//     });

//     pioneer
//       .save()
//       .then(() => {
//         savedPioneers++;
//         console.log(`Pioneer #${savedPioneers} has been saved to the database`);

//         // If we have saved all the pioneers, redirect the client
//         if(savedPioneers === NUM_PIONEERS) {
//           console.log(`All ${NUM_PIONEERS} pioneers have been saved`);
//           res.redirect('/');
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).send(err);
//       });
//   }
// });

// End of the static data for pioneer page.

// Contact Page Backend Code is here.

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
      date: Date.now(),
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

// Error code 404   route can be found here.
app.route("/error").get((req, res) => {
  res.render(__dirname + "/views/error.ejs");
});

// Capture all unknown routes and redirect to the error page
app.get("*", (req, res) => {
  res.redirect("/error");
});

// Opening the server on port 3000 and logging the port number to the console.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
