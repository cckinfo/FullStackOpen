import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    const entryExists = persons.find((person) => person.name === newName);
    if (entryExists) {
      if (
        window.confirm(
          `${newName} has already been addded. Replace old number with new one?`
        )
      ) {
        personService
          .update(entryExists.id, personObj)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
          )
          .catch((error) => {
            setErrorMessage(`${personObj.name} was already deleted.`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== entryExists.id)
            );
          });
        setNewName('');
        setNewNumber('');
      }
    } else {
        personService
          .create(personObj)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');

            setSuccessMessage(`${personObj.name} was successfully added to the phonebook.`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(JSON.stringify(error.response.data));
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
    }
  };
  const hook = () => {
    personService.getAll().then((response) => setPersons(response));
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteEntry(id).then(() => {
        personService.getAll().then((persons) => {
          setPersons(persons);
        });
      });
    }
  };

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} />
      <h3>Add a new person: </h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <h2>Numbers</h2>
      <ul>
        <Persons
          persons={persons}
          filter={newFilter}
          deletePerson={deletePerson}
        />
      </ul>
    </div>
  );
};

export default App;
