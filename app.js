require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');

app.get('/', (req, res) => {
  res.send('Ad Poster API');
});

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening in port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
