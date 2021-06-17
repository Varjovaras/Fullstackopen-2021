const DuplicateChecker = ({
  persons,
  newName,
  newNumber,
  personService,
  setPersons,
  setPersonList,
  setErrorMessage,
  setNewName,
  setNewNumber,
}) => {
  const duplicateChecker = persons.find((person) => newName === person.name);
  if (duplicateChecker) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook. Replace the old number with a new one?`
    );
    if (confirmUpdate) {
      const person = persons.find((person) => person.name === newName);
      const { id } = person;
      const changedPerson = { ...person, number: newNumber };

      personService
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
          setPersonList(persons.map((p) => (p.id !== id ? p : returnedPerson)));
          setErrorMessage(`Updated number for ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information for ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== id));
          setPersonList(persons.filter((p) => p.id !== id));

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");

    return;
  }
};

export default DuplicateChecker;
