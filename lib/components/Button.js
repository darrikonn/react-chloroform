'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = require('../store');

var _reducers = require('../store/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 'button' : _ref$type,
      text = _ref.text,
      className = _ref.className,
      style = _ref.style,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { type: type, className: className, style: style, disabled: disabled, onClick: onClick },
    text
  );
};

Button.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.string,
  text: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
  var type = _ref2.type,
      disabled = _ref2.disabled;
  return {
    disabled: type === 'submit' && (0, _reducers.hasFormErrors)(state) && disabled !== false || disabled
  };
};

exports.default = (0, _store.connect)(mapStateToProps)(Button);