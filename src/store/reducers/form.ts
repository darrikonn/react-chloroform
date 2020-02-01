import {FAILED, HAS_ERRORS, SUBMITTED, SUBMITTING} from '../../constants/form';
import {
  RESET_SUBMIT,
  SET_SUBMITTED,
  SET_SUBMITTING,
  SET_SUBMIT_FAILED,
  INITIALIZE_STATE,
} from '../action-types';

const initialState = {
  status: undefined,
  initialized: false,
};

export default (state: Store.FormState = initialState, action: Store.Action): Store.FormState => {
  switch (action.type) {
    case SET_SUBMITTED:
      return {...state, status: SUBMITTED};
    case SET_SUBMITTING:
      return {...state, status: SUBMITTING};
    case SET_SUBMIT_FAILED:
      return {...state, status: FAILED};
    case RESET_SUBMIT:
      return initialState;
    case INITIALIZE_STATE:
      return {...state, initialized: true};
    default:
      return state;
  }
};

export const getStatus = (state: Store.FormState, hasFormErrors: boolean) =>
  state.status || (hasFormErrors ? HAS_ERRORS : '');

export const getInitialized = (state: Store.FormState) => state.initialized;
