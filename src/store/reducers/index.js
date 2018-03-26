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

export const getError = (state, model) => fromControls.getError(state.controls, model);

export const getFormErrors = state => fromControls.getErrors(state.controls);

export const getFormValues = state => fromControls.getValues(state.controls);

export const getGroupModels = (state, group) => fromControls.getGroupModels(state.controls, group);

export const getValidateOn = (state, model) => fromControls.getValidateOn(state.controls, model);

export const getValidator = (state, model) => fromControls.getValidator(state.controls, model);

export const getValue = (state, model) => fromControls.getValue(state.controls, model);

export const hasBeenValidated = (state, model) =>
  fromControls.hasBeenValidated(state.controls, model);

export const hasError = (state, model) => fromControls.hasError(state.controls, model);

export const hasFormErrors = state => fromControls.hasErrors(state.controls);
