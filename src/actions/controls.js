import createActions from '.';
import {INITIALIZE_STATE, SET_ERRORS, SET_PENDING, SET_VALUE} from '../store/action-types';

const actions = {
  [INITIALIZE_STATE]: state => ({state}),
  [SET_ERRORS]: (name, errors) => ({name, errors}),
  [SET_PENDING]: (name, pending = true) => ({name, pending}),
  [SET_VALUE]: (name, value) => ({name, value}),
};

export default createActions(actions);
