const express = require('express');
const router = express.Router();
const Pioneer = require('../models/pioneer');
const _ = require('lodash');
const path = require('path');


// Initialising the chatgpt model with the backend.
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const { message } = req.body;
    
    // list of phrases we don't want the AI to answer
    const prohibitedPhrases = ['how are you', 'where are you', 'what are you doing'];
    
    // check if the message includes any of the prohibited phrases
    const includesProhibitedPhrase = prohibitedPhrases.some(phrase => message.toLowerCase().includes(phrase));

    // if it does, return a default response
    if (includesProhibitedPhrase) {
        return res.send('I\'m sorry, I can\'t assist with that.');
    }
    
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

    const answer = response.data.choices[0].text.trim();
    res.send(answer);
});



module.exports = router;
