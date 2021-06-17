import React from "react";
import Person from "./Person";

const PersonList = ({ personList, handleDeletePerson }) => {
  return (
    <ul>
      {personList.map((person) => (
        <Person
          key={person.id + 1}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default PersonList;
