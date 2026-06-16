import express from "express"

const app = express()

app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)
  if (!person) {
    return res.status(404).json({ error: "Person not found" })
  }
  res.json(person)
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" })
  }
  if (
    persons.find((p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase())
  ) {
    return res.status(400).json({ error: "Name must be unique" })
  }
  const newPerson = {
    id: crypto.randomUUID(),
    name,
    number,
  }
  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.get("/info", (req, res) => {
  const date = new Date()
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`,
  )
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
