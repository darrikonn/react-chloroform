import createActions from '.';
import {UPDATE_VALUE, INITIALIZE_STATE, RESET_FORM} from '../store/action-types';

const actions = {
  [UPDATE_VALUE]: (name, value) => ({name, value}),
  [INITIALIZE_STATE]: state => ({state}),
  [RESET_FORM]: () => {},
};

export default createActions(actions);
