const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Creating the database model
const Contact = mongoose.model("Contact", contactSchema);


module.exports = Contact;
