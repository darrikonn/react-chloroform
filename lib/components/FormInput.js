'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _controls = require('../actions/controls');

var _controls2 = _interopRequireDefault(_controls);

var _store = require('../store');

var _reducers = require('../store/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormInput = function (_Control) {
  _inherits(FormInput, _Control);

  function FormInput() {
    _classCallCheck(this, FormInput);

    return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).apply(this, arguments));
  }

  _createClass(FormInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          placeholder = _props.placeholder,
          _props$type = _props.type,
          type = _props$type === undefined ? 'text' : _props$type,
          _props$value = _props.value,
          value = _props$value === undefined ? '' : _props$value;


      return _react2.default.createElement('input', _extends({
        onChange: function onChange(e) {
          return _this2.onChange(e.target.value);
        },
        placeholder: placeholder,
        type: type,
        value: value
      }, this.properties()));
    }
  }]);

  return FormInput;
}(_Control3.default);

FormInput.propTypes = {
  placeholder: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['text', 'email']),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};


var mapStateToProps = function mapStateToProps(state, _ref) {
  var model = _ref.model;
  return {
    hasError: (0, _reducers.hasError)(state, model),
    isValidated: (0, _reducers.hasBeenValidated)(state, model),
    value: (0, _reducers.getValue)(state, model)
  };
};

var mapDispatchToProps = {
  markValidated: _controls2.default.markValidated,
  setErrors: _controls2.default.setErrors,
  setValue: _controls2.default.setValue
};

exports.default = (0, _store.connect)(mapStateToProps, mapDispatchToProps)(FormInput);