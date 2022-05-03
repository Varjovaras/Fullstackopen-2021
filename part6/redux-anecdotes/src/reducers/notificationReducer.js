// import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        notification: '',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
