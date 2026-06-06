import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
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
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      const nameObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }
      setPersons([...persons, nameObject])
      setNewName("")
      setPhoneNumber("")
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
      <Person filteredPerson={filteredPerson} />
    </div>
  )
}

export default App
