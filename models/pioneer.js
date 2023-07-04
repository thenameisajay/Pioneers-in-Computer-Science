const mongoose = require("mongoose");

// Create a new Schema for the database
const pioneerSchema = new mongoose.Schema({
  Number: Number,
  year: Number,
  century: Number,
  mactutorUrl: String,
  Name: String,
  intro: String,
  classification: String,
  achievement: String,
  wikiUrl: String,
  birthCountry: String,
  latitude: Number,
  longitude: Number,
  image: String,
});

// Create a new model for the database
const Pioneer = mongoose.model("Pioneer", pioneerSchema);


module.exports = Pioneer;