interface PersonFormProps {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newName: string
  phoneNumber: string
}

const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handlePhoneChange,
  newName,
  phoneNumber,
}: PersonFormProps) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Add a new</h3>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input type="text" value={phoneNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
