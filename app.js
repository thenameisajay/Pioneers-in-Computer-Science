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
const homeRouter = require("./routes/home");
const searchRouter = require("./routes/search");
const contactRouter = require("./routes/contact");
const aboutRouter = require("./routes/about");
const errorRouter = require('./routes/error');
const byNameRouter = require('./routes/by_name');
const byNameSearchRouter = require('./routes/by_name_search');
const catchAllRouter = require('./routes/catchAll');
const deleteRouter = require('./routes/delete');
const searchResultsRouter = require('./routes/searchResults');
const pioneerRouter = require('./routes/pioneer');
const byCountryRouter = require('./routes/by_country');
const byCountrySearchRouter = require('./routes/by_country_search');
const byFieldRouter = require('./routes/by_field');
const byFieldSearchRouter = require('./routes/by_field_search');
const mapRouter = require('./routes/map');
const chatRouter = require('./routes/chat');
const disclaimerRouter = require('./routes/disclaimer');
const takedownPolicyRouter = require('./routes/takedown_policy');
const copyrightRouter = require('./routes/copyright');
const accessibilityRouter = require('./routes/accessibility');
const privacyPolicyRouter = require('./routes/privacy_policy');
const roadMapRouter = require('./routes/road_map');








// Using the routes
app.use("/", homeRouter);
app.use("/search", searchRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/error", errorRouter);
app.use("/by_name", byNameRouter);
app.use("/by_name_search", byNameSearchRouter);
app.use("/delete", deleteRouter);
app.use("/searchResults", searchResultsRouter);
app.use("/pioneer", pioneerRouter);
app.use("/by_country", byCountryRouter);
app.use("/by_country_search", byCountrySearchRouter);
app.use("/by_field", byFieldRouter);
app.use("/by_field_search", byFieldSearchRouter);
app.use("/map", mapRouter);
app.use("/chat", chatRouter);
app.use("/disclaimer", disclaimerRouter);
app.use("/takedown_policy", takedownPolicyRouter);
app.use("/copyright", copyrightRouter);
app.use("/accessibility", accessibilityRouter);
app.use("/privacy_policy", privacyPolicyRouter);
app.use("/road_map", roadMapRouter);
app.use(catchAllRouter);









// Opening the server on port 3000 and logging the port number to the console.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

