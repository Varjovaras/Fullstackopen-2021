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

    const duplicateChecker = persons.find((p) => newName === p.name);
    console.log(duplicateChecker);
    if (duplicateChecker) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        personService.update(newNumber, duplicateChecker.id).then(() => {});
      }
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

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
