import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import phonebookService from "./services/phonebook"

type PersonType = {
  id: string
  name: string
  number: string
}

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      setLoading(false)
    })
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const personExists = persons.find(
      (p) => p.name.toLowerCase() === newName.trim().toLowerCase(),
    )
    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const updatedPerson = { ...personExists, number: phoneNumber }
        phonebookService
          .update(personExists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === personExists.id ? returnedPerson : p,
              ),
            )
            setNewName("")
            setPhoneNumber("")
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }
      phonebookService.create(nameObject).then((returnedPerson) => {
        setPersons([...persons, returnedPerson])
        setNewName("")
        setPhoneNumber("")
      })
    }
  }

  const deleteContact = (id: string) => {
    const personToDelete = persons.find((p) => p.id === id)
    if (personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        phonebookService.deleteContact(id).then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
      }
    }
  }

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        phoneNumber={phoneNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      {loading ? <p>Loading...</p> : null}
      <Person filteredPerson={filteredPerson} deleteContact={deleteContact} />
    </div>
  )
}

export default App
