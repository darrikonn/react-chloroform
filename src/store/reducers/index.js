import Immutable from 'immutable';

import {UPDATE_VALUE} from '../action-types';

export default (state = Immutable.Map(), action) => {
  const {payload} = action;
  switch (action.type) {
    case UPDATE_VALUE:
      return state.set(payload.name, payload.value);
    default:
      return state;
  }
};
