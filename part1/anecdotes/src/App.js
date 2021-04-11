import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); //

  const mostVotes = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0];

  console.log(votes);

  const voteHandler = () => {
    const copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);
  };
  console.log(votes);
  const nextAnecdote = () => {
    setSelected([Math.floor(Math.random() * anecdotes.length)]);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={voteHandler} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
    </div>
  );
};

export default App;
