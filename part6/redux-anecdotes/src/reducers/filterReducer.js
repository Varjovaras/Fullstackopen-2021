const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data;
    case 'ONKO_TTUNE':
      return 'ONKO TTUNE';
    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export default filterReducer;
