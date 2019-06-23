require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const personModel = require("./models/person");

app.use(express.static("build"));

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-432435",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "7434567",
    id: 2
  },
  {
    name: "Mary Poppins",
    number: "010-9457481",
    id: 3
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  personModel.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get("/info", (req, res) => {
  var today = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  personModel.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
});


app.delete('/api/persons/:id', (request, response, next) => {
  personModel.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new personModel({
    name: body.name,
    number: body.number
  });

  persons = persons.concat(person);

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
