const express = require('express');
const bodyParser = require('body-parser');

const app = express();





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});