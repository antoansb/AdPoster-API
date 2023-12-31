require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');

const connectDB = require('./db/connectDB');
const authenticateUser = require('./middleware/authentication');

const authenticateRouter = require('./routes/authenticate');
const adsRouter = require('./routes/ads');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Ad Poster API');
});

app.use('/api/v1/auth', authenticateRouter);
app.use('/api/v1/ads', authenticateUser, adsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
