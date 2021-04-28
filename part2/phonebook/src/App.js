import React, { useState } from "react";

const PersonList = ({ person }) => {
  return <li>{person.name + " " + person.number} </li>;
};

const Filter = ({ filter, setFilter, persons, setShowPersons }) => {
  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setFilter(event.target.value);

    if (filter.length !== 0) {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setShowPersons(filtered);
    } else setShowPersons(persons);
  };

  return (
    <form>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />{" "}
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showPersons, setShowPersons] = useState(persons);

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

    setPersons(persons.concat(nameObject));
    setShowPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        setFilter={setFilter}
        persons={persons}
        setPersons={setPersons}
        setShowPersons={setShowPersons}
      />
      <h2>add a new</h2>
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
      <h2>Numbers</h2>

      <ul>
        {showPersons.map((person) => (
          <PersonList key={person.id + 1} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
