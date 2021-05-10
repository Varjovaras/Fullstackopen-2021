import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ person, handleDeletePerson }) => {
  return (
    <li>
      {person.name + " " + person.number}{" "}
      <button onClick={handleDeletePerson}>delete</button>{" "}
    </li>
  );
};

const PersonList = ({ showPersons }) => {
  return (
    <ul>
      {showPersons.map((person) => (
        <Person key={person.id + 1} person={person} />
      ))}
    </ul>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />{" "}
      </div>
    </form>
  );
};

const AddName = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setShowPersons,
  setPersons,
  handleNameChange,
  handleNumberChange,
}) => {
  const addName = (event) => {
    event.preventDefault();

    const duplicateChecker = persons.find((p) => newName === p.name);
    if (duplicateChecker)
      return alert(`${newName} is already added to phonebook`);

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson.data));
      setShowPersons(persons.concat(returnedPerson.data));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            persons={persons}
          />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      console.log(response.data);
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        setFilter={setFilter}
        persons={persons}
        setPersons={setPersons}
        setShowPersons={setPersonList}
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
        setShowPersons={setPersonList}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <PersonList person={Person} showPersons={personList} />
    </div>
  );
};

export default App;
