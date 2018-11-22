import createActions from '.';
import {
  DELETE_VALUE,
  INITIALIZE_GROUP,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  MOUNT_MODEL,
  RESET_VALUES,
  SET_ERRORS,
  SET_GROUP,
  SET_VALUE,
  SHOW_ERRORS,
  UPDATE_VALUE,
} from '../store/action-types';

const actions = {
  [DELETE_VALUE]: (model, value) => ({model, value}),
  [INITIALIZE_GROUP]: (group, validator, validateOn) => ({group, validator, validateOn}),
  [INITIALIZE_STATE]: state => ({state}),
  [MARK_VALIDATED]: model => ({model}),
  [MOUNT_MODEL]: (model, parseValue, validated) => ({model, parseValue, validated}),
  [RESET_VALUES]: state => ({state}),
  [SET_ERRORS]: (model, errors) => ({model, errors}),
  [SET_GROUP]: (model, group) => ({model, group}),
  [SET_VALUE]: (model, value) => ({model, value}),
  [SHOW_ERRORS]: () => {},
  [UPDATE_VALUE]: (model, value) => ({model, value}),
};

export default createActions(actions);
