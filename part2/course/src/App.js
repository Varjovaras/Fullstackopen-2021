import React from "react";

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

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
  console.log(name, exercises);

  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />

      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};
export default App;

// const Total = (props) => {
//   return (
//     <>
//       Number of exercises{" "}
//       {props.parts[0].exercises +
//         props.parts[1].exercises +
//         props.parts[2].exercises}
//     </>
//   );
// };
