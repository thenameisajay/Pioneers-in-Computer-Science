const mongoose = require("mongoose");

// Create a new Schema for the database
const pioneerSchema = new mongoose.Schema({
  number: Number,
  year: Number,
  century: Number,
  mactutorUrl: String,
  name: String,
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