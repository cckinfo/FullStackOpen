
const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => (
    <form onSubmit={addPerson}>
    <div>
      Name: <input type="text" pattern="[A-Za-z\s]+" value={newName} onChange={(e) => setNewName(e.target.value)} />
      Number: <input type="tel" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm;