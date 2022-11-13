const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'))

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

let persons = [
  {
    id: uuidv4(),
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: uuidv4(),
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: uuidv4(),
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: uuidv4(),
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const reply = `<p>Phonebook has ${persons.length} entries.</p>`;
  response.send(reply + new Date());
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number missing.',
    });
  }

  let foundExisting = persons.find((person) => person.name == body.name);
  console.log(foundExisting);
  if (foundExisting) {
    return response.status(400).json({
      error: 'Name already exists.',
    });
  }

  console.log(Number(uuidv4()));
  const person = {
    id: uuidv4(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server currently running on port: ${PORT}`);
});
