import {FAILED, SUBMITTING, SUCCESSFUL} from '../../constants/form';
import {
  SET_SUBMITTING,
  SET_SUBMIT_FAILED,
  SET_SUBMIT_SUCCESSFUL,
  RESET_SUBMIT,
} from '../action-types';

const initialState = {
  status: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMITTING:
      return {...state, status: SUBMITTING};
    case SET_SUBMIT_FAILED:
      return {...state, status: FAILED};
    case SET_SUBMIT_SUCCESSFUL:
      return {...state, status: SUCCESSFUL};
    case RESET_SUBMIT:
      return initialState;
    default:
      return state;
  }
};

export const getStatus = state => state.status;
