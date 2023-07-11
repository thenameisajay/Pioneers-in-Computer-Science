const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer');
const _ = require('lodash');
const path = require('path');
const Chat = require('../models/chat');


// Initialising the chatgpt model with the backend.
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const message = req.body.message;
    let answer = '';

    //List of phrases I want the AI to answer that is related to the database of pioneers,
    const relatedPhrases = [
      'How many Pioneers are there in the database?',
      'What\'s the count of Pioneers in the database?',
      'What is the total number of Pioneers in the database?',
      'Could you tell me the number of Pioneers in the database?',
      'How many Pioneers do we have in the database?',
      'Can you provide the total of Pioneers in the database?',
      'What\'s the Pioneer count in the database?',
      'Tell me the total Pioneers present in the database?',
      'Count of Pioneers in the database?',
      'What\'s the total count of Pioneers registered in the database?',
      'Provide the quantity of Pioneers in our database.',
      'Can you count the Pioneers in the database for me?',
      'Do you know the total number of Pioneers we have in the database?',
      'What\'s the number of Pioneers listed in the database?',
      'I\'d like to know the quantity of Pioneers in the database.',
      'What are the total Pioneers recorded in our database?',
      'How many entries of Pioneers do we have in the database?',
      'What is the count of Pioneers entries in the database?',
      'Show me the number of Pioneers in our database.',
      'Find out the total Pioneers in the database.',
      'Can you inform me about the quantity of Pioneers in the database?',
      'How many Pioneers data entries exist in the database?',
      'Reveal the total count of Pioneers in the database.',
      'Do we know the total Pioneers in our database?',
      'How many Pioneers are recorded in the database?'
  ];
  
    const includesRelatedPhrase = relatedPhrases.some(phrase => message.toLowerCase().includes(phrase.toLowerCase()));


    if (includesRelatedPhrase) {
      let count = 0;
      try {
          const pioneers = await Pioneer.find();
          count = pioneers.length;
          return res.send(`There are ${count} pioneers in the database.`);
      } catch(err) {
          console.log(err);
      }
      
    }

    
    // list of phrases I don't want the AI to answer
    const prohibitedPhrases = [
      'what is your name',
      'what\'s your name',
      'what are you',
      'who are you',
      'what is your gender',
      'what\'s your gender',
      'what is your age',
      'what\'s your age',
      'what is your favorite color',
      'what\'s your favorite color',
      'what is your favorite food',
      'how are we today',
      'how are you', 
      'where are you', 
      'what are you doing',
      'Are you a male or female',
      'how do you do',
      'how\'s it going',
      'how are things',
      'how are you feeling today',
      'where can I find you',
      'where are you located',
      'where might you be',
      'where are you now',
      'what are you up to',
      'what are you working on',
      'what is happening on your end',
      'what\'s your current task',
      'what\'s your gender',
      'are you male or female',
      'can you tell me your gender',
      'are you of male or female gender',
      'how are we today ?'
  ];
  
    
    // check if the message includes any of the prohibited phrases
     const includesProhibitedPhrase = prohibitedPhrases.some(phrase => message.toLowerCase().includes(phrase));

    // if it does, return a default response
    if (includesProhibitedPhrase) {
      answer = 'I\'m sorry, I don\'t understand. Please ask me about pioneers of computer science.';
        res.render(path.join(__dirname, '../views/chat.ejs'), {message: message, answer: answer});
        
    }
    
    try {
      const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `The following is a conversation with an AI assistant specialized in pioneers of computer science. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${message}\nAI:`,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"],
      });
  
      answer = response.data.choices[0]?.text.trim();
  } catch (error) {
      console.error('Failed to get response from OpenAI', error);
      // Respond with a meaningful error message or a default answer
      answer = 'Sorry, I am currently experiencing issues. Please try again later.';
  }
  
    

// Save all chat prompts and answers to the database
   const chat = new Chat({
        message: message,
        answer: answer,
   });

chat.save().then(() => {
    console.log("Chat Data has been saved to the database");
   
  }
    ).catch((err) => console.log(err));

  // Send the message and response to the frontend
  res.render(path.join(__dirname, '../views/chat.ejs'), {message: message, answer: answer});

    
}).get('/', async (req, res) => {
  res.render(path.join(__dirname, '../views/chat.ejs'), {message: '', answer: ''});
});



module.exports = router;
