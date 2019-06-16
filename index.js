const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.static('build'))

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
  res.json(persons);
});

app.get("/info", (req, res) => {
  var today = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

const findDuplicateEntry = name => {
  let i = false;
  persons.forEach(element => {
    if (element.name === name) {
      i = true;
    }
  });
  return i;
};

app.post("/api/persons", (request, response) => {
  const person = request.body;
  console.log(person);
  if (!person.name) {
    return response.status(400).json({
      error: "name missing"
    });
  }

  if (!person.number) {
    return response.status(400).json({
      error: "number missing"
    });
  }

  if (findDuplicateEntry(person.name)) {
    return response.status(400).json({
      error: "name must be unique"
    });
  } else {
    const personObject = {
      name: person.name,
      number: person.number,
      id: generateRandomId()
    };

    persons = persons.concat(personObject);

    response.json(personObject);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
