import {SET_SUBMITTING, SET_SUBMIT_FAILED, RESET_SUBMIT} from '../action-types';

const initialState = {
  submitting: false,
  submitFailed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMITTING:
      return {...state, submitting: true};
    case SET_SUBMIT_FAILED:
      return {...state, submitFailed: true};
    case RESET_SUBMIT:
      return initialState;
    default:
      return state;
  }
};
