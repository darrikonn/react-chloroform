import createActions from '.';
import {SET_PENDING, SET_SUBMITTING, SET_SUBMIT_FAILED, RESET_STATES} from '../store/action-types';

const actions = {
  [SET_PENDING]: (name, pending = true) => ({name, pending}),
  [SET_SUBMITTING]: (name, pending = true) => ({name, pending}),
  [SET_SUBMIT_FAILED]: (name, pending = true) => ({name, pending}),
  [RESET_STATES]: (name, pending = true) => ({name, pending}),
};

export default createActions(actions);
