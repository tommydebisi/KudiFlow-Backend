const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


// parse json in request body
app.use(express.json());
app.use(bodyParser.json());

// parse form in request body
app.use(express.urlencoded({extended: false}));

// promotes cross origin resource sharing
app.use(cors());


const port = 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
