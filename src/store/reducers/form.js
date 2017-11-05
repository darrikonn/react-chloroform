import Immutable from 'immutable';

import {SET_SUBMITTING, SET_SUBMIT_FAILED, RESET_SUBMIT} from '../action-types';

const initialState = Immutable.fromJS({
  submitting: false,
  submitFailed: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMITTING:
      return state.set('submitting', true);
    case SET_SUBMIT_FAILED:
      return state.set('submitFailed', true);
    case RESET_SUBMIT:
      return initialState;
    default:
      return state;
  }
};
