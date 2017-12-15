import createActions from '.';
import {
  DELETE_VALUE,
  INITIALIZE_STATE,
  SET_ERRORS,
  SET_GROUP,
  SET_PENDING,
  SET_VALUE,
  UPDATE_VALUE,
} from '../store/action-types';

const actions = {
  [DELETE_VALUE]: (model, value) => ({model, value}),
  [INITIALIZE_STATE]: state => ({state}),
  [SET_ERRORS]: (model, errors) => ({model, errors}),
  [SET_GROUP]: (model, group) => ({model, group}),
  [SET_PENDING]: (model, pending = true) => ({model, pending}),
  [SET_VALUE]: (model, value) => ({model, value}),
  [UPDATE_VALUE]: (model, value) => ({model, value}),
};

export default createActions(actions);
