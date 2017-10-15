import Immutable from 'immutable';

import {UPDATE_VALUE, INITIALIZE_STATE} from '../action-types';

export default (state = Immutable.Map(), action) => {
  const {payload} = action;
  switch (action.type) {
    case INITIALIZE_STATE:
      return state.merge(payload.state);
    case UPDATE_VALUE:
      return state.set(payload.name, payload.value);
    default:
      return state;
  }
};
