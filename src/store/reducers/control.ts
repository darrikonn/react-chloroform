import {
  INITIALIZE_STATE,
  MARK_VALIDATED,
  MOUNT_MODEL,
  RESET_VALUES,
  SET_ERRORS,
  SET_VALUE,
  SHOW_ERRORS,
} from '../action-types';
import {/*arrayToObject, mergeDeep, merge,*/ fromDotProp, getIn, getIndex, isNumber, isObject, isArray} from '../../utils';

const constructModel = (arr: string[], state: ExplicitAny = {}): {} => {
  if (arr.length == 0) {
    return 'foo';
  } else if (arr[0] === "*") {
    return state.value;
  } else if (isNumber(arr[0])) {
    return [
      ...(state.value || []).slice(0, parseInt(arr[0])),
      {value: constructModel(arr.slice(1), getIn(state, 'value', arr[0], 'value'))},
      ...(state.value || []).slice(parseInt(arr[0]) + 1),
    ];
  } else {
    return {
      ...state,
      [arr[0]]: {
        ...state[arr[0]],
        value: constructModel(arr.slice(1), state[arr[0]]),
      },
    } as ObjectValue;
  }
};

const setDeep: ExplicitAny = (arr: string[], state: ExplicitAny = {}, newValue: ExplicitAny) => {
  if (arr.length == 0) {
    return newValue;
  } else if (arr[0] === "*") {
    return (state.value || []).map((v: ExplicitAny) => ({
      value: setDeep(arr.slice(1), v.value, newValue)
    }));
  } else if (isNumber(arr[0])) {
    return [
      ...(state.value || []).slice(0, parseInt(arr[0])),
      {value: setDeep(arr.slice(1), getIn(state, 'value', arr[0], 'value'), newValue)},
      ...(state.value || []).slice(parseInt(arr[0]) + 1),
    ];
  } else {
    return {
      ...state,
      [arr[0]]: {
        ...state[arr[0]],
        value: setDeep(arr.slice(1), state[arr[0]], newValue),
      },
    } as ObjectValue;
  }
};

export default (state: Store.ControlState = {}, action: Store.Action): Store.ControlState => {
  const {payload} = action;
  switch (action.type) {
    case INITIALIZE_STATE:
      return {
        ...state,
        ...Object.keys(payload.state).reduce((accumulator, next) => ({
          ...accumulator,
          ...setDeep(next.split('.'), state, payload.state[next]),
        }), {}),
      };
    case MOUNT_MODEL: {
      const model = payload.model.split('.');
      // console.log(payload.model, constructModel(model, state));
      return {
        ...state,
        ...constructModel(model, state),
      };
    }
    case RESET_VALUES:
      return state;
      // return Object.keys(state).reduce((nextState, model) => {
      //   const value = Object.keys(payload.state).reduce((newValue, key) => {
      //     if (fromDotProp(key) === model) {
      //       return merge(newValue, payload.state[key], key);
      //     }
      //     return newValue;
      //   }, merge(state[model].value, undefined, model))
      //
      //   return {
      //     ...nextState,
      //     [model]: {
      //       ...state[model],
      //       value,
      //     },
      //   };
      // }, {});
    case SET_ERRORS: {
      return state;
      // const model = fromDotProp(payload.model);
      // return {
      //   ...state,
      //   [model]: {
      //     ...state[model],
      //     errors: payload.errors,
      //   },
      // };
    }
    case SET_VALUE: {
      return state;
      // const model = fromDotProp(payload.model);
      // return {
      //   ...state,
      //   [model]: {
      //     ...state[model],
      //     value: merge(getIn(state, model, 'value'), payload.value, payload.model),
      //   },
      // };
    }
    case MARK_VALIDATED: { // combine with show_errors
      return state;
      // const model = fromDotProp(payload.model);
      // return {
      //   ...state,
      //   [model]: {
      //     ...state[model],
      //     validated: true,
      //   },
      // };
    }
    case SHOW_ERRORS:
      return state;
      // return {
      //   ...Object.keys(state).reduce((nextState, next) => {
      //     const model = fromDotProp(next);
      //     return {
      //       ...nextState,
      //       [model]: {
      //         ...state[model],
      //         validated: true
      //       },
      //     };
      //   }, {}),
      // };
    default:
      return state;
  }
};

export const getError = (state: Store.ControlState, model: string) =>
  getIn(state, fromDotProp(model), 'validation', model, 'errors');

export const getValue = (state: Store.ControlState, model: string) => {
  const value = getIn(state, fromDotProp(model), 'value');
  if (model.includes('.')) {
    const idx: string = getIndex(model);
    if (isNumber(idx)) {
      return getIn(value, idx);
    }
  }
  return value;
};

// const parseValues = (value: Scalar, parseValue: {[key: string]: Function}, model: string) => {
//   if (Array.isArray(value)) {
//     return value.map((v, i) => {
//       const parse = parseValue['*'] || parseValue[i] || ((x: Scalar) => x);
//       return v ? parse(v) : undefined;
//     });
//   }
//
//   const key = getIndex(model);
//   const parse = parseValue[key] || ((x: Scalar) => x);
//   return value ? parse(value) : value;
// };
//

const getStateValue = (state: ExplicitAny = {}): {} => {
  if (isArray(state.value)) {
    return state.value.map((s: ExplicitAny) => getStateValue(s));
  } else if (isObject(state.value)) {
    return Object.keys(state.value).reduce((acc, v) => ({
      ...acc,
      [v]: getStateValue(state.value[v]),
    }), {});
  } else {
    return state.value;
  }
};

export const getValues = (state: Store.ControlState) => {
  return state;
  return Object.keys(state).reduce((acc, model) => ({
    ...acc,
    [model]: getStateValue(state[model]),
  }), {});
};

export const hasBeenValidated = (state: Store.ControlState, model: string) =>
  getIn(state, fromDotProp(model), 'validation', model, 'validated');

export const hasError = (state: Store.ControlState, model: string): boolean => {
  const errors = getError(state, model);
  return Boolean(getIn(errors, 'length'));
};

export const hasErrors = (state: Store.ControlState) =>
  Object.keys(state).filter(model => hasError(state, model)).length > 0;
