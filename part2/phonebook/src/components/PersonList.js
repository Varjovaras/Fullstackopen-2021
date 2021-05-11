import React from "react";
import Person from "./Person";

const PersonList = ({ personList, handleDeletePerson }) => {
  // console.log(personList);
  return (
    <ul>
      {personList?.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default PersonList;
