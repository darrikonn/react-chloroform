'use strict';

exports.__esModule = true;
exports.hasErrors = exports.hasError = exports.hasBeenValidated = exports.getValues = exports.getValue = exports.getValidator = exports.getValidateOn = exports.getGroupModels = exports.getError = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('../action-types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var payload = action.payload;

  switch (action.type) {
    case _actionTypes.DELETE_VALUE:
      {
        var previousValue = getValue(state, payload.model) || [];

        return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
          value: previousValue.filter(function (value) {
            return value !== payload.value;
          })
        })));
      }
    case _actionTypes.INITIALIZE_STATE:
      return _extends({}, state, Object.keys(payload.state).reduce(function (accumulator, model) {
        return _extends({}, accumulator, _defineProperty({}, model, _extends({}, state[model], {
          value: payload.state[model]
        })));
      }, {}));
    case _actionTypes.MARK_VALIDATED:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        validated: true
      })));
    case _actionTypes.RESET_VALUES:
      return _extends({}, Object.keys(state).reduce(function (accumulator, model) {
        return _extends({}, accumulator, _defineProperty({}, model, _extends({}, state[model], {
          value: payload.state[model]
        })));
      }, {}));
    case _actionTypes.SET_ERRORS:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        errors: payload.errors
      })));
    case _actionTypes.SET_GROUP:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        group: payload.group
      })));
    case _actionTypes.SET_VALIDATE_ON:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        validateOn: payload.validateOn
      })));
    case _actionTypes.SET_VALIDATOR:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        validator: payload.validator
      })));
    case _actionTypes.SET_VALUE:
      return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
        value: payload.value
      })));
    case _actionTypes.SHOW_ERRORS:
      return _extends({}, Object.keys(state).reduce(function (accumulator, model) {
        return _extends({}, accumulator, _defineProperty({}, model, _extends({}, state[model], {
          validated: true
        })));
      }, {}));
    case _actionTypes.UPDATE_VALUE:
      {
        var _previousValue = getValue(state, payload.model) || [];

        return _extends({}, state, _defineProperty({}, payload.model, _extends({}, state[payload.model], {
          value: [].concat(_toConsumableArray(_previousValue), [payload.value])
        })));
      }
    default:
      return state;
  }
};

var getError = exports.getError = function getError(state, model) {
  return (state[model] || {}).errors;
};

var getGroupModels = exports.getGroupModels = function getGroupModels(state, group) {
  return Object.keys(state).reduce(function (accumulator, model) {
    return state[model].group === group ? _extends({}, accumulator, _defineProperty({}, model, state[model].value)) : accumulator;
  }, {});
};

var getValidateOn = exports.getValidateOn = function getValidateOn(state, model) {
  return (state[model] || {}).validateOn;
};

var getValidator = exports.getValidator = function getValidator(state, model) {
  return (state[model] || {}).validator;
};

var getValue = exports.getValue = function getValue(state, model) {
  return (state[model] || {}).value;
};

var getValues = exports.getValues = function getValues(state) {
  return Object.keys(state).reduce(function (accumulator, model) {
    return _extends({}, accumulator, _defineProperty({}, model, state[model].value));
  }, {});
};

var hasBeenValidated = exports.hasBeenValidated = function hasBeenValidated(state, model) {
  return (state[model] || {}).validated;
};

var hasError = exports.hasError = function hasError(state, model) {
  var errors = getError(state, model);
  return errors !== undefined && errors.length > 0;
};

var hasErrors = exports.hasErrors = function hasErrors(state) {
  return Object.keys(state).filter(function (model) {
    return hasError(state, model);
  }).length > 0;
};