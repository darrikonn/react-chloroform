import controls, * as fromControls from './controls';
import form from './form';

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
  form,
});

export const getValue = (state, model) => fromControls.getValue(state.controls, model);

export const getValues = state => fromControls.getValues(state.controls);

export const getErrors = state => fromControls.getErrors(state.controls);

export const hasError = state => fromControls.hasError(state.controls);
