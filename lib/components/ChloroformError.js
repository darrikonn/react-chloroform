'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = require('../store');

var _reducers = require('../store/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChloroformError = function ChloroformError(_ref) {
  var error = _ref.error,
      showError = _ref.showError,
      component = _ref.component;

  if (!error || error.size === 0 || !showError) {
    return null;
  }

  return _react2.default.createElement(component, { error: error });
};

ChloroformError.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired,
  error: _propTypes2.default.arrayOf(_propTypes2.default.string),
  model: _propTypes2.default.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  showError: _propTypes2.default.bool
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
  var model = _ref2.model;
  return {
    error: (0, _reducers.getError)(state, model),
    showError: (0, _reducers.hasBeenValidated)(state, model)
  };
};

exports.default = (0, _store.connect)(mapStateToProps)(ChloroformError);