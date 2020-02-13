import {createSelector} from 'reselect';

import {HAS_ERRORS, SUBMITTING} from '../../constants/form';

import control, * as fromControl from './control';
import form, * as fromForm from './form';

const combineReducers = (reducers: {[key: string]: typeof control | typeof form}) => (
  state: {[key: string]: Store.FormState & Store.ControlState} = {},
  action: Store.Action
) =>
  Object.keys(reducers).reduce(
    (nextState, key) => ({
      ...nextState,
      [key]: reducers[key](state[key], action),
    }),
    {}
  );

export default combineReducers({
  control,
  form,
});

/*
 * Form
 */
export const getFormStatus = (state: Store.CombinedState) =>
  fromForm.getStatus(state.form, hasFormErrors(state));

export const canBeSubmitted = (state: Store.CombinedState) =>
  [HAS_ERRORS, SUBMITTING].includes(getFormStatus(state));

export const isFormInitialized = (state: Store.CombinedState) =>
  fromForm.getInitialized(state.form);

/*
 * Control
 */
export const getError = (state: Store.CombinedState, model: string) =>
  fromControl.getError(state.control, model);

export const getFormValues = (state: Store.CombinedState) => fromControl.getValues(state.control.store);

export const getValue = () => createSelector(
  (state: Store.CombinedState): {[_: string]: ExplicitAny}  => state.control.store,
  (_: ExplicitAny, model: string): string => model,
  (store: {[_: string]: Function}, model: string) => fromControl.getValue(store, model.split('.')),
)

export const getValidators = () => createSelector(
  (state: Store.CombinedState): {[_: string]: Function}  => state.control.validators,
  (_: ExplicitAny, model: string): string => model,
  (validators: {[_: string]: Function}, model: string) => fromControl.getValidators(validators, model),
)

export const hasBeenValidated = (state: Store.CombinedState, model: string) =>
  fromControl.hasBeenValidated(state.control, model);

export const hasError = (state: Store.CombinedState, model: string) =>
  fromControl.hasError(state.control, model);

export const hasFormErrors = (state: Store.CombinedState): boolean => fromControl.hasErrors(state.control);
