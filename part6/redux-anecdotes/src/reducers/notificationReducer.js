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
  window.clearTimeout(window.timeout);

  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    window.timeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        notification: '',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
