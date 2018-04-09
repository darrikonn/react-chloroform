'use strict';

exports.__esModule = true;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isString = exports.isString = function isString(val) {
  return typeof val === 'string';
};

var parseValidators = exports.parseValidators = function parseValidators() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments[1];
  return validator.reduce(function (errorList, nextValidator) {
    var validatedValue = nextValidator(value);
    return [].concat(_toConsumableArray(errorList), _toConsumableArray(isString(validatedValue) ? [validatedValue] : []));
  }, []);
};