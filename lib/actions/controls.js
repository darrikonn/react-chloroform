'use strict';

exports.__esModule = true;

var _actions;

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _actionTypes = require('../store/action-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = (_actions = {}, _defineProperty(_actions, _actionTypes.DELETE_VALUE, function (model, value) {
  return { model: model, value: value };
}), _defineProperty(_actions, _actionTypes.INITIALIZE_STATE, function (state) {
  return { state: state };
}), _defineProperty(_actions, _actionTypes.MARK_VALIDATED, function (model) {
  return { model: model };
}), _defineProperty(_actions, _actionTypes.RESET_VALUES, function (state) {
  return { state: state };
}), _defineProperty(_actions, _actionTypes.SET_ERRORS, function (model, errors) {
  return { model: model, errors: errors };
}), _defineProperty(_actions, _actionTypes.SET_GROUP, function (model, group) {
  return { model: model, group: group };
}), _defineProperty(_actions, _actionTypes.SET_VALIDATE_ON, function (model, validateOn) {
  return { model: model, validateOn: validateOn };
}), _defineProperty(_actions, _actionTypes.SET_VALIDATOR, function (model, validator) {
  return { model: model, validator: validator };
}), _defineProperty(_actions, _actionTypes.SET_VALUE, function (model, value) {
  return { model: model, value: value };
}), _defineProperty(_actions, _actionTypes.SHOW_ERRORS, function () {}), _defineProperty(_actions, _actionTypes.UPDATE_VALUE, function (model, value) {
  return { model: model, value: value };
}), _actions);

exports.default = (0, _2.default)(actions);