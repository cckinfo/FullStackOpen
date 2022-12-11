require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Entry = require('./models/entry');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :body'
  )
);

app.get('/api/persons', (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries);
  });
});

app.get('/info', async (request, response) => {
  const length = await Entry.countDocuments({});
  const reply = `<p>Phonebook has ${length} entries.</p>`;
  response.send(reply + new Date());
});

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const entry = {
    name: body.name,
    number: body.number,
  };

  Entry.findByIdAndUpdate(request.params.id, entry, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server currently running on port: ${PORT}`);
});
