require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const faker = require('faker');


const app = express();

// Your MongoDB connection string
const db = process.env.MONGO_URL;

// The number of fake pioneers to create
const NUM_PIONEERS = 100;



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





mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Define the route for creating new pioneers
app.get('/create', (req, res) => {
    let savedPioneers = 0; // Keep track of how many pioneers have been saved

    // Create pioneers in a loop
    for (let i = 0; i < NUM_PIONEERS; i++) {
        const pioneer = new Pioneer({
            search_id: `id_${i}`,
            name: `name_${i}`,
            description: `description_${i}`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg",
            link: "https://en.wikipedia.org/wiki/Alan_Turing",
        });

        pioneer
            .save()
            .then(() => {
                savedPioneers++;
                console.log(`Pioneer #${savedPioneers} has been saved to the database`);

                // If we have saved all the pioneers, redirect the client
                if (savedPioneers === NUM_PIONEERS) {
                    console.log(`All ${NUM_PIONEERS} pioneers have been saved`);
                    res.redirect('/');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
