import React, { useState } from "react";

const PersonList = ({ person }) => {
  return <li>{person.name + " " + person.number}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: 420420420 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([persons]);
  console.log(filteredPersons);

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
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (filter.length !== 0) {
      const filtered = persons.filter((person) =>
        // Check if the search term is included in the names in the phonebook
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      );

      setFilteredPersons(filtered);
      console.log(filteredPersons);
    } else setFilteredPersons(persons);
    console.log(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with{" "}
          <input value={filter} onChange={handleFilterChange} />{" "}
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
        {filteredPersons.map((person) => (
          <PersonList key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
