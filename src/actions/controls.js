import createActions from '.';
import {
  DELETE_VALUE,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  RESET_VALUES,
  SET_ERRORS,
  SET_GROUP,
  SET_VALIDATE_ON,
  SET_VALIDATOR,
  SET_VALUE,
  SHOW_ERRORS,
  UPDATE_VALUE,
} from '../store/action-types';

const actions = {
  [DELETE_VALUE]: (model, value) => ({model, value}),
  [INITIALIZE_STATE]: state => ({state}),
  [MARK_VALIDATED]: model => ({model}),
  [RESET_VALUES]: state => ({state}),
  [SET_ERRORS]: (model, errors) => ({model, errors}),
  [SET_GROUP]: (model, group) => ({model, group}),
  [SET_VALIDATE_ON]: (model, validateOn) => ({model, validateOn}),
  [SET_VALIDATOR]: (model, validator) => ({model, validator}),
  [SET_VALUE]: (model, value) => ({model, value}),
  [SHOW_ERRORS]: () => {},
  [UPDATE_VALUE]: (model, value) => ({model, value}),
};

export default createActions(actions);
