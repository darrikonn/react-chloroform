import controls from './controls';
import states from './states';

const combineReducers = reducers => (state = {}, action) =>
  Object.keys(reducers).reduce(
    (nextState, key) => ({
      ...nextState,
      [key]: reducers[key](state[key], action),
    }),
    {},
  );

export default combineReducers({
  controls,
  states,
});
