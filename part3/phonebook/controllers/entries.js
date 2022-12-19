const entryRouter = require('express').Router();
const Entry = require('../models/entry');

entryRouter.get('/', (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries);
  });
});

entryRouter.get('/:id', (request, response, next) => {
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

entryRouter.post('/', (request, response, next) => {
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

entryRouter.put('/:id', (request, response, next) => {
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

entryRouter.delete('/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = entryRouter;