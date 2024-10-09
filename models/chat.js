const mongoose = require('mongoose');

//Defining the schema for the chat data
const chatSchema = new mongoose.Schema({
  message: String,
  answer: String,
  date: { type: Date, default: Date.now },
});

// Creating the database model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
