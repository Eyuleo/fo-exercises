import dotenv from "dotenv/config"

import express from "express"
import morgan from "morgan"

import Person from "./models/phonebook.js"

const app = express()

app.use(express.json())

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
)

let persons = []

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: "Person not found" })
      }
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" })
  }
  Person.findOne({ name: name }).then((existingPerson) => {
    if (existingPerson) {
      return res.status(400).json({ error: "Name must be unique" })
    }
    const newPerson = new Person({
      name,
      number,
    })
    newPerson.save().then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
  })
})

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        res.status(404).end()
      }
      person.name = name
      person.number = number

      person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get("/info", (req, res) => {
  const date = new Date()
  Person.countDocuments().then((total) => {
    res.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted ID" })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
