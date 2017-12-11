import createActions from '.';
import {INITIALIZE_STATE, SET_ERRORS, SET_PENDING, SET_VALUE} from '../store/action-types';

const actions = {
  [INITIALIZE_STATE]: state => ({state}),
  [SET_ERRORS]: (model, errors) => ({model, errors}),
  [SET_PENDING]: (model, pending = true) => ({model, pending}),
  [SET_VALUE]: (model, value) => ({model, value}),
};

export default createActions(actions);
