const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});