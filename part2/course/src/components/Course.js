import React from "react";
const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />

      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

//KKontent
const Content = ({ parts }) => {
  return (
    <>
      <>
        {parts.map((part) => {
          return (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          );
        })}
      </>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((p, s) => p + s.exercises, 0);
  return (
    <>
      <h3>total of {total} exercises</h3>
    </>
  );
};

export default Course;
