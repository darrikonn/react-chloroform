import Immutable from 'immutable';

import {
  DELETE_VALUE,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  RESET_VALUES,
  SET_ERRORS,
  SET_GROUP,
  SET_PENDING,
  SET_VALUE,
  UPDATE_VALUE,
} from '../action-types';

export default (state = Immutable.Map(), action) => {
  const {payload} = action;
  switch (action.type) {
    case INITIALIZE_STATE:
      return state.mergeDeep(
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
    case MARK_VALIDATED:
      return state.setIn([payload.model, 'validated'], true);
    case RESET_VALUES:
      return state.map((model, key) => model.set('value', payload.state[key]));
    case SET_ERRORS:
      return state.setIn([payload.model, 'errors'], Immutable.fromJS(payload.errors));
    case SET_GROUP:
      return state.setIn([payload.model, 'group'], payload.group);
    case SET_PENDING:
      return state.updateIn([payload.model, 'pending'], isPending => !isPending);
    case SET_VALUE:
      return state.setIn([payload.model, 'value'], Immutable.fromJS(payload.value));
    case UPDATE_VALUE:
      return state.updateIn([payload.model, 'value'], (lis = Immutable.List()) =>
        lis.push(Immutable.fromJS(payload.value)),
      );
    case DELETE_VALUE: {
      const index = (state.getIn([payload.model, 'value']) || Immutable.List()).indexOf(payload.value);
      return index > -1 ? state.deleteIn([payload.model, 'value', index]) : state;
    }
    default:
      return state;
  }
};

export const getGroupModels = (state, group) => state.filter(model => model.get('group') === group);

export const getValue = (state, model) => state.getIn([model, 'value']);

export const getValues = state => state.map(model => model.get('value'));

export const hasBeenValidated = (state, model) => state.getIn([model, 'validated']);

export const hasError = (state, model) => {
  const errors = state.getIn([model, 'errors']);
  return errors !== undefined && !errors.isEmpty();
};

export const hasErrors = state =>
  !state
    .filter(model => {
      const errors = model.get('errors');
      return errors !== undefined && !errors.isEmpty();
    })
    .isEmpty();
