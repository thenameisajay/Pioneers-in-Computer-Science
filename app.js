require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");


// Importing the database models
const Contact = require("./models/contact");
const Pioneer = require("./models/pioneer");

// Initializing the express app
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initializing the database connection
connectDB();

// Importing the routes
const createRouter = require("./routes/create");
const homeRouter = require("./routes/home");
const searchRouter = require("./routes/search");
const contactRouter = require("./routes/contact");
const aboutRouter = require("./routes/about");
const errorRouter = require('./routes/error');
const byNameRouter = require('./routes/by_name');
const catchAllRouter = require('./routes/catchAll');
const deleteRouter = require('./routes/delete');






// Using the routes
app.use("/", homeRouter);
app.use("/create", createRouter);
app.use("/search", searchRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/error", errorRouter);
app.use("/by_name", byNameRouter);
app.use("/delete", deleteRouter);
app.use(catchAllRouter);









// Opening the server on port 3000 and logging the port number to the console.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
