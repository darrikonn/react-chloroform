'use strict';

exports.__esModule = true;
exports.hasFormErrors = exports.hasError = exports.hasBeenValidated = exports.getValue = exports.getValidator = exports.getValidateOn = exports.getGroupModels = exports.getFormValues = exports.getError = exports.canBeSubmitted = exports.getFormStatus = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _form = require('../../constants/form');

var _controls = require('./controls');

var fromControls = _interopRequireWildcard(_controls);

var _form2 = require('./form');

var fromForm = _interopRequireWildcard(_form2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var combineReducers = function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    return Object.keys(reducers).reduce(function (nextState, key) {
      return _extends({}, nextState, _defineProperty({}, key, reducers[key](state[key], action)));
    }, {});
  };
};

exports.default = combineReducers({
  controls: fromControls.default,
  form: fromForm.default
});

/*
 * Form
 */

var getFormStatus = exports.getFormStatus = function getFormStatus(state) {
  return fromForm.getStatus(state.form, hasFormErrors(state));
};

var canBeSubmitted = exports.canBeSubmitted = function canBeSubmitted(state) {
  return [_form.HAS_ERRORS, _form.SUBMITTING].includes(getFormStatus(state));
};

/*
 * Controls
 */
var getError = exports.getError = function getError(state, model) {
  return fromControls.getError(state.controls, model);
};

var getFormValues = exports.getFormValues = function getFormValues(state) {
  return fromControls.getValues(state.controls);
};

var getGroupModels = exports.getGroupModels = function getGroupModels(state, group) {
  return fromControls.getGroupModels(state.controls, group);
};

var getValidateOn = exports.getValidateOn = function getValidateOn(state, model) {
  return fromControls.getValidateOn(state.controls, model);
};

var getValidator = exports.getValidator = function getValidator(state, model) {
  return fromControls.getValidator(state.controls, model);
};

var getValue = exports.getValue = function getValue(state, model) {
  return fromControls.getValue(state.controls, model);
};

var hasBeenValidated = exports.hasBeenValidated = function hasBeenValidated(state, model) {
  return fromControls.hasBeenValidated(state.controls, model);
};

var hasError = exports.hasError = function hasError(state, model) {
  return fromControls.hasError(state.controls, model);
};

var hasFormErrors = exports.hasFormErrors = function hasFormErrors(state) {
  return fromControls.hasErrors(state.controls);
};