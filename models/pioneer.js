const mongoose = require("mongoose");

// Create a new Schema for the database
const pioneerSchema = new mongoose.Schema({
    search_id: String,
    name: String,
    description: String,
    image: String,
    link: String,
  });
  
  // Create a new model for the database
  const Pioneer = mongoose.model("Pioneer", pioneerSchema);


  module.exports = Pioneer;