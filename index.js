const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :req[content-length]'));
app.use(express.static('build'));

let persons = [
    {
        name: "Moran Elad",
        number: "054-9087978",
        id: 1
    },
    {
        name: "Omer Elad",
        number: "054-2094747",
        id: 2
    },
    {
        name: "Amit Elad",
        number: "054-2848441",
        id: 3
    },
    {
        name: "Tomer Elad",
        number: "054-2848600",
        id: 4
    }
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 100;
  }

  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date.toString()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const idParam = Number(req.params.id);
    const person = persons.find(person => idParam === person.id)

    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const idParam = Number(req.params.id);
    persons = persons.filter(person => idParam !== person.id)

        res.status(204).end();
    }
)

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({error: "content missing"});
    }

    if (persons.some(person => person.name === req.body.name)) {
        return res.status(400).json({error: "name must be unique"});

    }
    const newPerson = {
        name: req.body.name,
        number: req.body.number,
        id: getRandomInt(10000)
    }

    persons.push(newPerson);

    res.json(newPerson);
})

  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
