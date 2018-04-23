'use strict';

exports.__esModule = true;
exports.getStatus = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _form = require('../../constants/form');

var _actionTypes = require('../action-types');

var initialState = {
  status: undefined
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.SET_SUBMITTED:
      return _extends({}, state, { status: _form.SUBMITTED });
    case _actionTypes.SET_SUBMITTING:
      return _extends({}, state, { status: _form.SUBMITTING });
    case _actionTypes.SET_SUBMIT_FAILED:
      return _extends({}, state, { status: _form.FAILED });
    case _actionTypes.RESET_SUBMIT:
      return initialState;
    default:
      return state;
  }
};

var getStatus = exports.getStatus = function getStatus(state, hasFormErrors) {
  return state.status || (hasFormErrors ? _form.HAS_ERRORS : undefined);
};