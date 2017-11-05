import Immutable from 'immutable';

import {SET_VALUE, SET_ERRORS, SET_PENDING, INITIALIZE_STATE} from '../action-types';

export default (state = Immutable.Map(), action) => {
  const {payload} = action;
  switch (action.type) {
    case INITIALIZE_STATE:
      return state.merge(
        Immutable.fromJS(
          Object.keys(payload.state).reduce(
            (obj, k) => ({
              ...obj,
              [k]: {value: payload.state[k]},
            }),
            {},
          ),
        ),
      );
    case SET_ERRORS:
      return state.setIn([payload.name, 'errors'], Immutable.fromJS(payload.errors));
    case SET_PENDING:
      return state.setIn([payload.name, 'pending'], payload.pending);
    case SET_VALUE:
      return state.setIn([payload.name, 'value'], payload.value);
    default:
      return state;
  }
};

export const getValue = (state, name) => state.getIn([name, 'value']);

export const getValues = state => state.map(model => model.get('value'));

export const getErrors = state => state.map(model => model.get('errors'));

export const hasError = state => state.filter(model => model.get('errors')).size > 0;

export const getErrors2 = state => {
  return state.reduce((lis, key) => {
    const errors = state.getIn([key, 'errors']);
    return [...lis, ...(errors ? errors : lis)];
  }, []);
};
