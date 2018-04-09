'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = require('../constants/events');

var _validators = require('../services/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_Component) {
  _inherits(Control, _Component);

  function Control(props) {
    _classCallCheck(this, Control);

    var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, props));

    _this.onChange = function (value) {
      var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.model;

      _this.props.setValue(model, value);
    };

    _this.getClassName = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          hasError = _this$props.hasError,
          isValidated = _this$props.isValidated;

      return [className, hasError && isValidated ? 'error' : undefined].join(' ').trim();
    };

    _this.markValidated = function () {
      var model = _this.props.model;

      _this.props.markValidated(model);
    };

    _this.properties = function () {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          id = _this$props2.id,
          style = _this$props2.style,
          validateOn = _this$props2.validateOn;


      return {
        className: _this.getClassName(),
        disabled: disabled,
        id: id,
        style: style,

        onBlur: validateOn === _events.BLUR ? _this.markValidated : undefined,
        onFocus: validateOn === _events.FOCUS ? _this.markValidated : undefined,
        onKeyUp: validateOn === _events.INPUT ? _this.markValidated : undefined
      };
    };

    _this._validateModel = function () {
      var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.model;
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.value;

      _this.validateModel(model, value);
    };

    _this.validateModel = function (model, value) {
      var validator = _this.props.validator;

      _this.props.setErrors(model, (0, _validators.parseValidators)(validator, value));
    };

    return _this;
  }

  _createClass(Control, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$validateOn = this.props.validateOn,
          validateOn = _props$validateOn === undefined ? _events.MOUNT : _props$validateOn;


      this._validateModel();
      if (validateOn === _events.MOUNT) {
        this.markValidated();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      if (oldProps.value !== this.props.value) {
        this._validateModel();
      }
    }
  }]);

  return Control;
}(_react.Component);

Control.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  hasError: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  isValidated: _propTypes2.default.bool,
  markValidated: _propTypes2.default.func.isRequired,
  model: _propTypes2.default.string.isRequired,
  setErrors: _propTypes2.default.func.isRequired,
  setValue: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.string,
  validateOn: _propTypes2.default.oneOf([_events.BLUR, _events.FOCUS, _events.INPUT, _events.MOUNT]),
  validator: _propTypes2.default.arrayOf(_propTypes2.default.func.isRequired),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
Control.defaultProps = {
  validator: []
};
exports.default = Control;