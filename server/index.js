const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./config/connectDB");

const port = 5000;

const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('Hi Mom, my API is working!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});