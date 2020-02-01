import { __assign, __spreadArrays } from "tslib";
import { INITIALIZE_STATE, MARK_VALIDATED, MOUNT_MODEL, RESET_VALUES, SET_ERRORS, SET_VALUE, SHOW_ERRORS, } from '../action-types';
import { /*arrayToObject, mergeDeep, merge,*/ fromDotProp, getIn, getIndex, isNumber, isObject, isArray } from '../../utils';
var constructModel = function (arr, state) {
    var _a;
    if (state === void 0) { state = {}; }
    if (arr.length == 0) {
        return 'foo';
    }
    else if (arr[0] === "*") {
        // TODO
        // maxIndex: Math.max(isNumber(arr[0]) ? parseInt(arr[0]) : 0),
        return state;
    }
    else if (isNumber(arr[0])) {
        return __spreadArrays((state.value || []).slice(0, parseInt(arr[0])), [
            { value: constructModel(arr.slice(1), getIn(state, 'value', arr[0])) }
        ], (state.value || []).slice(parseInt(arr[0]) + 1));
    }
    else {
        return __assign(__assign({}, state), (_a = {}, _a[arr[0]] = __assign(__assign({}, state[arr[0]]), { value: constructModel(arr.slice(1), state[arr[0]]) }), _a));
    }
};
var setDeep = function (arr, state, newValue) {
    var _a;
    if (state === void 0) { state = {}; }
    if (arr.length == 0) {
        return newValue;
    }
    else if (arr[0] === "*") {
        return (state.value || []).map(function (v, i) { return ({
            value: setDeep(arr.slice(1), v[i], newValue)
        }); });
    }
    else if (isNumber(arr[0])) {
        return __spreadArrays((state.value || []).slice(0, parseInt(arr[0])), [
            { value: setDeep(arr.slice(1), getIn(state, 'value', arr[0], 'value'), newValue) }
        ], (state.value || []).slice(parseInt(arr[0]) + 1));
    }
    else {
        return __assign(__assign({}, state), (_a = {}, _a[arr[0]] = __assign(__assign({}, state[arr[0]]), { value: setDeep(arr.slice(1), state[arr[0]], newValue) }), _a));
    }
};
export default (function (state, action) {
    if (state === void 0) { state = {}; }
    var payload = action.payload;
    switch (action.type) {
        case INITIALIZE_STATE:
            return __assign(__assign({}, state), Object.keys(payload.state).reduce(function (accumulator, next) { return (__assign(__assign({}, accumulator), setDeep(next.split('.'), state, payload.state[next]))); }, {}));
        case MOUNT_MODEL: {
            var model = payload.model.split('.');
            return __assign(__assign({}, state), constructModel(model, state));
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
});
export var getError = function (state, model) {
    return getIn(state, fromDotProp(model), 'validation', model, 'errors');
};
export var getValue = function (state, model) {
    var value = getIn(state, fromDotProp(model), 'value');
    if (model.includes('.')) {
        var idx = getIndex(model);
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
var getStateValue = function (state) {
    if (state === void 0) { state = {}; }
    if (isArray(state.value)) {
        return state.value.map(function (s) { return getStateValue(s); });
    }
    else if (isObject(state.value)) {
        return Object.keys(state.value).reduce(function (acc, v) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[v] = getStateValue(state.value[v]), _a)));
        }, {});
    }
    else {
        return state.value;
    }
};
export var getValues = function (state) {
    return Object.keys(state).reduce(function (acc, model) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[model] = getStateValue(state[model]), _a)));
    }, {});
};
export var hasBeenValidated = function (state, model) {
    return getIn(state, fromDotProp(model), 'validation', model, 'validated');
};
export var hasError = function (state, model) {
    var errors = getError(state, model);
    return Boolean(getIn(errors, 'length'));
};
export var hasErrors = function (state) {
    return Object.keys(state).filter(function (model) { return hasError(state, model); }).length > 0;
};
//# sourceMappingURL=control.js.map