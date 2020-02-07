import createActions from '.';
import {
  DELETE_VALUE,
  INITIALIZE_GROUP,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  MOUNT_MODEL,
  SET_ERRORS,
  SET_GROUP,
  SET_VALUE,
  SHOW_ERRORS,
  UPDATE_VALUE,
} from '../store/action-types';

const actions = {
  [DELETE_VALUE]: (model: string, value: Scalar): {} => ({model, value}),
  [INITIALIZE_GROUP]: (group: string, validator: Function, validateOn: string): {} => ({
    group,
    validator,
    validateOn,
  }),
  [INITIALIZE_STATE]: (initialState: {}): {} => ({initialState}),
  [MARK_VALIDATED]: (model: string): {} => ({model}),
  [MOUNT_MODEL]: (model: string, parseValue: Function, validated: boolean): {} => ({
    model,
    parseValue,
    validated,
  }),
  [SET_ERRORS]: (model: string, errors: string[]): {} => ({model, errors}),
  [SET_GROUP]: (model: string, group: string): {} => ({model, group}),
  [SET_VALUE]: (model: string, value: Scalar): {} => ({model, value}),
  [SHOW_ERRORS]: () => {},
  [UPDATE_VALUE]: (model: string, value: Scalar) => ({model, value}),
};

export default createActions(actions);
