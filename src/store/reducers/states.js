import Immutable from 'immutable';

import {SET_PENDING, SET_SUBMITTING, SET_SUBMIT_FAILED, RESET_STATES} from '../action-types';

const initialState = Immutable.fromJS({
  pending: false,
  submitting: false,
  submitFailed: false,
});

export default (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case SET_PENDING:
      return state.setIn([payload.name, 'pending'], payload.pending);
    case SET_SUBMITTING:
      return state.setIn([payload.name, 'submitting'], payload.pending);
    case SET_SUBMIT_FAILED:
      return state.setIn([payload.name, 'submitFailed'], payload.pending);
    case RESET_STATES:
      return initialState;
    default:
      return state;
  }
};
