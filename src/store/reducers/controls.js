import {
  DELETE_VALUE,
  INITIALIZE_GROUP,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  RESET_VALUES,
  SET_ERRORS,
  SET_GROUP,
  SET_VALUE,
  SHOW_ERRORS,
  UPDATE_VALUE,
} from '../action-types';

export default (state = {}, action) => {
  const {payload} = action;
  switch (action.type) {
    case DELETE_VALUE: {
      const previousValue = getValue(state, payload.model) || [];

      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          value: previousValue.filter(value => value !== payload.value),
        },
      };
    }
    case INITIALIZE_GROUP:
      return {
        ...state,
        [payload.group]: {
          skipReset: true,
          validateOn: payload.validateOn,
          validator: payload.validator,
          value: [],
        },
      };
    case INITIALIZE_STATE:
      return {
        ...state,
        ...Object.keys(payload.state).reduce(
          (accumulator, model) => ({
            ...accumulator,
            [model]: {
              ...state[model],
              value: payload.state[model],
            },
          }),
          {}
        ),
      };
    case MARK_VALIDATED:
      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          validated: true,
        },
      };
    case RESET_VALUES:
      return {
        ...Object.keys(state).reduce(
          (accumulator, model) => ({
            ...accumulator,
            [model]: {
              ...state[model],
              value: state[model].skipReset ? state[model].value : payload.state[model],
            },
          }),
          {}
        ),
      };
    case SET_ERRORS:
      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          errors: payload.errors,
        },
      };
    case SET_GROUP:
      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          group: payload.group,
        },
      };
    case SET_VALUE:
      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          value: payload.value,
        },
      };
    case SHOW_ERRORS:
      return {
        ...Object.keys(state).reduce(
          (accumulator, model) => ({
            ...accumulator,
            [model]: {
              ...state[model],
              validated: true,
            },
          }),
          {}
        ),
      };
    case UPDATE_VALUE: {
      const previousValue = getValue(state, payload.model) || [];

      return {
        ...state,
        [payload.model]: {
          ...state[payload.model],
          value: [...previousValue, payload.value],
        },
      };
    }
    default:
      return state;
  }
};

export const getError = (state, model) => (state[model] || {}).errors;

export const getGroupModels = (state, group) =>
  Object.keys(state).reduce(
    (accumulator, model) =>
      state[model].group === group
        ? {
            ...accumulator,
            [model]: state[model].value,
          }
        : accumulator,
    {}
  );

export const getValidateOn = (state, model) => (state[model] || {}).validateOn;

export const getValidator = (state, model) => (state[model] || {}).validator;

export const getValue = (state, model) => (state[model] || {}).value;

export const getValues = state =>
  Object.keys(state).reduce(
    (accumulator, model) => ({
      ...accumulator,
      [model]: state[model].value,
    }),
    {}
  );

export const hasBeenValidated = (state, model) => (state[model] || {}).validated;

export const hasError = (state, model) => {
  const errors = getError(state, model);
  return errors !== undefined && errors.length > 0;
};

export const hasErrors = state =>
  Object.keys(state).filter(model => hasError(state, model)).length > 0;
