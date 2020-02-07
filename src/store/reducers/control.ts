import {
  MOUNT_MODEL,
  INITIALIZE_STATE,
  MARK_VALIDATED,
  SET_ERRORS,
  SET_VALUE,
  SHOW_ERRORS,
} from '../action-types';
import {fromDotProp, getIn, isNumber, isObject, isArray} from '../../utils';

const constructBlueprint = (arr: string[], state: ExplicitAny = {}): ExplicitAny => {
  if (arr.length == 0) {
    return undefined;
  } else if (arr[0] === "*" || isNumber(arr[0])) {
    return {
      ...state,
      '*': {
        length: Math.max(isNumber(arr[0]) ? parseInt(arr[0]) + 1 : 0, getIn(state, '*', 'length') || 0),
        value: constructBlueprint(arr.slice(1), getIn(state, '*', 'value')),
      }
    };
  } else {
    if ('*' in state) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Usage Error!\nYou're mixing Arrays and Objects within the same model value");
      }
    }

    return {
      ...state,
      [arr[0]]: constructBlueprint(arr.slice(1), state[arr[0]]),
    } as ObjectValue;
  }
};
const findBestMatch = (map: {[key: string]: ExplicitAny}, match: string): ExplicitAny => {
  if (match in map) {
    return map[match];
  } else if (match && match.split('.').some(m => isNumber(m))) {
    return findBestMatch(map, match.replace(/\.\d+(?![\s\S]*\.\d+)/, '.*'))
  } else {
    return undefined;
  }
};

const initializeState = (state: ExplicitAny = {}, initialState: {}, currentPath: string = ''): {} => {
  const keys: string[] = Object.keys(state);
  if (keys.length === 0) {
    return findBestMatch(initialState, currentPath);
  } else {
    return keys.reduce((acc: ExplicitAny, next: ExplicitAny) => {
      if (next === '*') {
        return Array.from({length: state['*'].length}).map((_, i: number) => ({value: initializeState(state['*'].value, initialState, `${currentPath}.${i}`)}));
      } else {
        return {
          ...acc,
          [next]: {
            ...acc[next],
            value: initializeState(state[next], initialState, currentPath ? `${currentPath}.${next}` : next),
          }
        };
      }
    }, {});
  }
};

const setInEveryLeaf = (state: ExplicitAny, newValue: ExplicitAny): ExplicitAny => {
  if (isArray(state)) {
    return state.map((s: ExplicitAny) => ({
      value: setInEveryLeaf(s.value, newValue),
    }));
  } else if (isObject(state)) {
    return Object.keys(state).reduce((acc: ExplicitAny, next: ExplicitAny) => {
      return {
        ...acc,
        [next]: {
          ...acc[next],
          value: setInEveryLeaf(state[next].value, newValue),
        },
      };
    }, {});
  } else {
    return newValue;
  }
};

const setDeep: ExplicitAny = (arr: string[], state: ExplicitAny = {}, newValue: ExplicitAny) => {
  if (arr.length == 0) {
    return {
      ...state,
      value: setInEveryLeaf(state.value, newValue),
    }
  } else if (arr[0] === "*") {
    return {
      ...state,
      value: (state.value || []).map((v: ExplicitAny) => setDeep(arr.slice(1), v, newValue)),
    };
  } else if (isNumber(arr[0])) {
    return {
      ...state,
      value: [
        ...(state.value || []).slice(0, parseInt(arr[0])),
        setDeep(arr.slice(1), state.value[arr[0]], newValue),
        ...(state.value || []).slice(parseInt(arr[0]) + 1),
      ]
    };
  } else {
    return {
      ...state,
      value: {
        ...state.value,
        [arr[0]]: setDeep(arr.slice(1), state.value[arr[0]], newValue),
      },
    } as ObjectValue;
  }
};

export default (state: Store.ControlState = {blueprint: {}, store: {}}, action: Store.Action): Store.ControlState => {
  const {payload} = action;
  switch (action.type) {
    case MOUNT_MODEL: {
      const model = payload.model.split('.');
      return {
        ...state,
        blueprint: {
          ...state.blueprint,
          ...constructBlueprint(model, state.blueprint),
        }
      };
    }
    case INITIALIZE_STATE:
      return {
        ...state,
        store: initializeState(state.blueprint, payload.initialState),
      };
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
      const model = payload.model.split('.');
      return {
        ...state,
        store: {
          ...state.store,
          [model[0]]: setDeep(model.slice(1), state.store[model[0]], payload.value),
        },
      };
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

const flattenObject = (obj: ExplicitAny, result: ExplicitAny = []) => {
  for (const i in obj) {
    if (isObject(obj[i])) {
      result = [...flattenObject(obj[i], result)];
    } else {
      result = [...result, obj[i]];
    }
  };
  return result;
};

export const getValue = (state: ExplicitAny, arr: string[]): ExplicitAny => {
  if (arr.length == 0) {
    return state;
  } else if (!state || Object.keys(state).length === 0) {
    return undefined;
  } else if (arr[0] === "*") {
    const values: ExplicitAny = flattenObject((state || []).map((v: ExplicitAny) => getValue(v.value, arr.slice(1))));
    if (values.some((v: ExplicitAny) => v !== values[0])) {
      return undefined;
    } else {
      return values[0];
    }
  } else {
    return getValue(getIn(state, arr[0], 'value'), arr.slice(1));
  }
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
  return Object.keys(state.store).reduce((acc, model) => ({
    ...acc,
    [model]: getStateValue(state.store[model]),
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
