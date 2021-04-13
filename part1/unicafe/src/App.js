import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value, percent }) => {
  //
  return (
    <tr>
      <td>{text}</td>{" "}
      <td>
        {" "}
        {value} {percent}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  console.log(good, bad, neutral);
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all; // average feedback if good = 1, neutral = 0, bad = -1
  const positive = (good / all) * 100; //positive feedback in %

  if (all === 0)
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  else
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} percent={"%"} />
          </tbody>
        </table>
      </>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
