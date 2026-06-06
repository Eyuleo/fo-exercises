interface PersonProps {
  filteredPerson: {
    name: string
    number: string
    id: number
  }[]
}

const Person = ({ filteredPerson }: PersonProps) => {
  return (
    <>
      {filteredPerson.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  )
}

export default Person
