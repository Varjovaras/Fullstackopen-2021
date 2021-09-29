import React from "react";
import personService from "./../services/persons";
import DuplicateChecker from "./DuplicateChecker";

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
  setErrorMessage,
}) => {
  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    DuplicateChecker({
      persons,
      newName,
      newNumber,
      personService,
      setPersons,
      setPersonList,
      setErrorMessage,
      setNewName,
      setNewNumber,
    });

    personService
      .create(nameObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson.data));
        setPersonList(persons.concat(returnedPerson.data));
        setErrorMessage(`Added number for ${returnedPerson.data.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(`${error.response.data.error}`);
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
