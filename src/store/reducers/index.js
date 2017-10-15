import {UPDATE_VALUE} from '../action-types';

import controls from './controls';
import states from './states';

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};

export default combineReducers({
  controls,
  states,
});
