import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import PersonList from "./components/PersonList";
import AddName from "./components/AddName";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personList, setPersonList] = useState([]);

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
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name} ?`);
    if (confirmDelete) {
      personService.deletePerson(id).then(() => {
        const filteredPersons = persons.filter((person) => person.id !== id);
        setPersons(filteredPersons);
        setPersonList(filteredPersons);

        setFilter("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

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
