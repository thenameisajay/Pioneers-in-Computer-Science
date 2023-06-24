const mongoose = require("mongoose");

// Create a new Schema for the database
const pioneerSchema = new mongoose.Schema({
    year: Number,
    century: Number,
    name: String,
    achievement: String,
    classification: [String],
    wikiUrl: String,
    birthCountry: String,
    image: String,
    latitude: Number,
    longitude: Number,
  });
  
  // Create a new model for the database
  const Pioneer = mongoose.model("Pioneer", pioneerSchema);


  module.exports = Pioneer;