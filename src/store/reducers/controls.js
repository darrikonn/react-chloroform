import {
  DELETE_VALUE,
  INITIALIZE_GROUP,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  MOUNT_MODEL,
  RESET_VALUES,
  SET_ERRORS,
  SET_GROUP,
  SET_VALUE,
  SHOW_ERRORS,
  UPDATE_VALUE,
} from '../action-types';
import {arrayToObject, mergeDeep, merge, fromDotProp, getIn, getIndex} from '../../utils';

/* Store structure
{
  address.zip: {
    validateOn: String,
    validated: Boolean,
    errors: Array,
    parseValue: Function,
    value: Scalar,
  },
  drinks.*: {
    validateOn: String,
    validated: Boolean,
    errors: Array,
    parseValue: Function,
    value: [
      validateOn: String,
      validated: Boolean,
      errors: Array,
      parseValue: Function,
      value: Scalar,
    ],
  },
}
 */

export default (state = {}, action) => {
  const {payload} = action;
  switch (action.type) {
    case INITIALIZE_STATE:
      return {
        ...state,
        ...Object.keys(payload.state).reduce((accumulator, next) => {
          const model = fromDotProp(next);
          return {
            ...accumulator,
            [model]: {
              ...state[model],
              value: merge(
                getIn(accumulator, model, 'value') || getIn(state, model, 'value'),
                payload.state[next],
                next
              ),
            },
          };
        }, {}),
      };
    case MOUNT_MODEL: {
      const model = fromDotProp(payload.model);
      return {
        ...state,
        [model]: {
          ...state[model],
          value: merge(getIn(state, model, 'value'), undefined, payload.model),
          parseValue: {
            ...getIn(state, model, 'parseValue'),
            ...(payload.parseValue ? {[getIndex(payload.model)]: payload.parseValue} : {}),
          },
          validation: {
            ...getIn(state, model, 'validation'),
            [payload.model]: {
              errors: [],
              validated: payload.validated,
            },
          },
        },
      };
    }
    case RESET_VALUES:
      return Object.keys(state).reduce((nextState, model) => {
        const value = Object.keys(payload.state).reduce((newValue, key) => {
          if (fromDotProp(key) === model) {
            return merge(newValue, payload.state[key], key);
          }
          return newValue;
        }, merge(state[model].value, undefined, model))

        return {
          ...nextState,
          [model]: {
            ...state[model],
            value,
          },
        };
      }, {});
    case SET_ERRORS: {
      const model = fromDotProp(payload.model);
      return {
        ...state,
        [model]: {
          ...state[model],
          validation: {
            ...state[model].validation,
            [payload.model]: {
              ...state[model].validation[payload.model],
              errors: payload.errors,
            },
          },
        },
      };
    }
    case SET_VALUE: {
      const model = fromDotProp(payload.model);
      return {
        ...state,
        [model]: {
          ...state[model],
          value: merge(getIn(state, model, 'value'), payload.value, payload.model),
        },
      };
    }
    case MARK_VALIDATED: { // combine with show_errors
      const model = fromDotProp(payload.model);
      return {
        ...state,
        [model]: {
          ...state[model],
          validation: {
            ...state[model].validation,
            [payload.model]: {
              ...state[model].validation[payload.model],
              validated: true,
            },
          },
        },
      };
    }
    case SHOW_ERRORS:
      return {
        ...Object.keys(state).reduce((nextState, next) => {
          const model = fromDotProp(next);
          return {
            ...nextState,
            [model]: {
              ...state[model],
              validation: {
                ...state[model].validation,
                [payload.model]: {
                  ...state[model].validation[payload.model],
                  validated: true,
                },
              },
            },
          };
        }, {}),
      };
    default:
      return state;
  }
};

export const getError = (state, model) =>
  getIn(state, fromDotProp(model), 'validation', model, 'errors');

export const getValue = (state, model) => {
  const value = getIn(state, fromDotProp(model), 'value');
  if (model.includes('.')) {
    const idx = getIndex(model);
    if (!isNaN(idx)) {
      return getIn(value, idx);
    }
  }
  return value;
};

const parseValues = (value, parseValue, model) => {
  if (Array.isArray(value)) {
    return value.map((v, i) => {
      const parse = parseValue['*'] || parseValue[i] || (x => x);
      return v ? parse(v) : undefined;
    });
  }

  const key = getIndex(model);
  const parse = parseValue[key] || (x => x);
  return value ? parse(value) : value;
};

export const getValues = state => {
  return Object.keys(state).reduce(
    (accumulator, model) => ({
      ...mergeDeep(
        accumulator,
        arrayToObject(
          model.split('.'),
          parseValues(getIn(state, model, 'value'), getIn(state, model, 'parseValue'), model)
        )
      ),
    }),
    {}
  );
};

export const hasBeenValidated = (state, model) =>
  getIn(state, fromDotProp(model), 'validation', model, 'validated');

export const hasError = (state, model) => {
  const errors = getError(state, model);
  return Boolean(getIn(errors, 'length'));
};

export const hasErrors = state =>
  Object.keys(state).filter(model => hasError(state, model)).length > 0;
