'use strict';

exports.__esModule = true;

var _actions;

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _actionTypes = require('../store/action-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = (_actions = {}, _defineProperty(_actions, _actionTypes.RESET_SUBMIT, function () {}), _defineProperty(_actions, _actionTypes.SET_SUBMITTING, function () {}), _defineProperty(_actions, _actionTypes.SET_SUBMIT_FAILED, function () {}), _actions);

exports.default = (0, _2.default)(actions);