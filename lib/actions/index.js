"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var camelCase = function camelCase(string) {
  return string.toLowerCase().replace(/(_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
};

var actionCreator = function actionCreator(_ref) {
  var type = _ref.type,
      payload = _ref.payload;
  return function (dispatch) {
    return dispatch({
      type: type,
      payload: payload
    });
  };
};

var createActions = function createActions(actions) {
  return Object.keys(actions).reduce(function (createdActions, type) {
    return _extends({}, createdActions, _defineProperty({}, camelCase(type), function () {
      return actionCreator({ type: type, payload: actions[type].apply(actions, arguments) });
    }));
  }, {});
};

exports.default = createActions;