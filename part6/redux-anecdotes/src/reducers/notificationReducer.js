// import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action);
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  console.log(notification);
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        notification: '',
      });
    }, 5000);
  };
};

export default notificationReducer;
