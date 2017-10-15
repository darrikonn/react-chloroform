import Immutable from 'immutable';

import {SET_PENDING} from '../action-types';

export default (state = Immutable.Map(), action) => {
  const {payload} = action;
  switch (action.type) {
    case SET_PENDING:
      return state.set(payload.name, payload.pending);
    default:
      return state;
  }
};
