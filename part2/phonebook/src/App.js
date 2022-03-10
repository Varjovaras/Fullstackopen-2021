import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonList from './components/PersonList';
import AddName from './components/AddName';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [personList, setPersonList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      setPersonList(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersonList(filtered);
  };

  const handleDeletePerson = (id) => {
    console.log(id);
    const findPerson = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${findPerson.name} ?`);
    if (confirmDelete) {
      personService.deletePerson(id).then(() => {
        const filteredPersons = persons.filter((person) => person.id !== id);
        setPersons(filteredPersons);
        setPersonList(filteredPersons);
        setErrorMessage(`Deleted number for ${person.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setFilter('');
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter
        filter={filter}
        setFilter={setFilter}
        persons={persons}
        setPersons={setPersons}
        setPersonList={setPersonList}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>

      <AddName
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setPersons={setPersons}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        setPersonList={setPersonList}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setErrorMessage={setErrorMessage}
      />

      <h2>Numbers</h2>
      <PersonList
        personList={personList}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
