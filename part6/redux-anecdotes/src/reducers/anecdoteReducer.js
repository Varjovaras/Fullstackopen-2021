import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  switch (action.type) {
    case 'ADD_ANECDOTE':
      console.log(action);
      const newAnecdote = action.data;
      return state.concat(newAnecdote).sort((a, b) => b.votes - a.votes);

    case 'VOTE':
      const id = action.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state
        .map((a) => (a.id === id ? changedAnecdote : a))
        .sort((a, b) => b.votes - a.votes);

    case 'APPEND_ANECDOTE':
      return state.concat(action.content);
    // case 'SET_ANECDOTES':
    //   return action.anecdotes;
    default:
      return state;
  }
};

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const vote_Anecdote = (content) => {
  return {
    type: 'VOTE',
    id: content,
  };
};

export const setAnecdotes = (action) => {
  return {
    type: 'APPEND_ANECDOTE',
    content: action,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdote = (content) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(content);
    dispatch(vote_Anecdote(content));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote.content));
  };
};

export default reducer;
