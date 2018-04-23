import {FAILED, HAS_ERRORS, SUBMITTED, SUBMITTING} from '../../constants/form';
import {RESET_SUBMIT, SET_SUBMITTED, SET_SUBMITTING, SET_SUBMIT_FAILED} from '../action-types';

const initialState = {
  status: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMITTED:
      return {...state, status: SUBMITTED};
    case SET_SUBMITTING:
      return {...state, status: SUBMITTING};
    case SET_SUBMIT_FAILED:
      return {...state, status: FAILED};
    case RESET_SUBMIT:
      return initialState;
    default:
      return state;
  }
};

export const getStatus = state => state.status;
