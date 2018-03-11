import createActions from '.';
import {RESET_SUBMIT, SET_SUBMITTING, SET_SUBMIT_FAILED} from '../store/action-types';

const actions = {
  [RESET_SUBMIT]: () => {},
  [SET_SUBMITTING]: () => {},
  [SET_SUBMIT_FAILED]: () => {},
};

export default createActions(actions);
