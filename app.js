require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');

const authenticateRouter = require('./routes/authenticate');
const adsRouter = require('./routes/ads');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ad Poster API');
});

app.use('/api/v1/auth', authenticateRouter);
app.use('/api/v1/ads', adsRouter);

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
