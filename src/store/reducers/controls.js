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
      return state.setIn([payload.model, 'errors'], Immutable.fromJS(payload.errors));
    case SET_PENDING:
      return state.setIn([payload.model, 'pending'], payload.pending);
    case SET_VALUE:
      return state.setIn([payload.model, 'value'], payload.value);
    default:
      return state;
  }
};

export const getValue = (state, model) => state.getIn([model, 'value']);

export const getValues = state => state.map(model => model.get('value'));

export const getError = (state, model) => state.getIn([model, 'errors']);

export const getErrors = state => state.map(model => model.get('errors'));

export const hasError = (state, model) => {
  const errors = state.getIn([model, 'errors']);
  return errors !== undefined && !errors.isEmpty();
};

export const hasErrors = state => !state.filter(model => {
  const errors = model.get('errors');
  return errors !== undefined && !errors.isEmpty();
}).isEmpty();
