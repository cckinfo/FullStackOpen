import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (checkIfNameExists()) {
      alert(`${newName} has already been addded.`);
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObj));
    setNewName('');
  };

  const checkIfNameExists = () => {
    const found = persons.filter((pers) => pers.name === newName);
    if (found === undefined || found.length == 0) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" pattern="[A-Za-z]+" value={newName} onChange={handlePersonChange} />
          number: <input type="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
