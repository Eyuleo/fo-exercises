interface PersonProps {
  filteredPerson: {
    name: string
    number: string
    id: string
  }[]
  deleteContact: (id: string) => void
}

const Person = ({ filteredPerson, deleteContact }: PersonProps) => {
  return (
    <>
      {filteredPerson.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </p>
      ))}
    </>
  )
}

export default Person
