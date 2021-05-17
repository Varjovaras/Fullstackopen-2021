import React from "react";
import personService from "./../services/persons";

const AddName = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setPersonList,
  setPersons,
  handleNameChange,
  handleNumberChange,
}) => {
  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const duplicateChecker = persons.find((person) => newName === person.name);
    if (duplicateChecker) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            setPersonList(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
          });
      }
      setNewName("");
      setNewNumber("");

      return;
    }

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson.data));
      setPersonList(persons.concat(returnedPerson.data));
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
export default AddName;
