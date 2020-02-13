import createActions from '.';
import {
  INITIALIZE_GROUP,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  MOUNT_MODEL,
  SET_VALUE,
  SHOW_ERRORS,
} from '../store/action-types';

const actions = {
  [INITIALIZE_GROUP]: (group: string, validator: Function, validateOn: string): {} => ({
    group,
    validator,
    validateOn,
  }),
  [INITIALIZE_STATE]: (initialState: {}, validators: {[key: string]: Function}): {} => ({initialState, validators}),
  [MARK_VALIDATED]: (model: string): {} => ({model}),
  [MOUNT_MODEL]: (model: string, parseValue: Function, validated: boolean, validator?: Function): {} => ({
    model,
    parseValue,
    validated,
    validator,
  }),
  [SET_VALUE]: (model: string, value: Scalar): {} => ({model, value}),
  [SHOW_ERRORS]: () => {},
};

export default createActions(actions);
