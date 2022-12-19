const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const entryRouter = require('./controllers/entries');
const mongoose = require('mongoose');
const morgan = require('morgan');

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :body'
  )
);

logger.info('Connecting to: ', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB: ', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/persons', entryRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
