import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// import anecdoteService from './services/anecdotes';
// import { appendAnecdote } from './reducers/anecdoteReducer';

// anecdoteService.getAll().then((anecdotes) =>
//   anecdotes.forEach((anecdote) => {
//     store.dispatch(appendAnecdote(anecdote));
//   })
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
