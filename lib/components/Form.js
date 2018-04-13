'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _controls = require('../actions/controls');

var _controls2 = _interopRequireDefault(_controls);

var _form = require('../actions/form');

var _form2 = _interopRequireDefault(_form);

var _store = require('../store');

var _reducers = require('../store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
      _this.props.onChange(e);
    }, _this.handleSubmit = function (e) {
      e.preventDefault();

      var _this$props = _this.props,
          afterSubmitState = _this$props.afterSubmitState,
          values = _this$props.values,
          hasFormErrors = _this$props.hasFormErrors;


      if (hasFormErrors) {
        _this.props.showErrors();
        return;
      }

      // this.props.setPending(this.props.model);
      _this.props.setSubmitting();
      Promise.resolve().then(function () {
        return _this.props.onSubmit(values);
      }).then(function () {
        return _this.props.initializeState(afterSubmitState);
      }).catch(function (err) {
        _this.props.setSubmitFailed();
        _this.props.onSubmitFailed(err);
      }).finally(function () {
        return _this.props.resetSubmit();
      });
    }, _this.handleReset = function (e) {
      e.preventDefault();

      _this.props.resetValues(_this.props.initialState);
      _this.props.onReset();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.initializeState(this.props.initialState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          style = _props.style;


      return _react2.default.createElement(
        'form',
        {
          className: className,
          onChange: this.handleChange,
          onReset: this.handleReset,
          onSubmit: this.handleSubmit,
          style: style
        },
        children
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  afterSubmitState: _propTypes2.default.shape({}),
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  hasFormErrors: _propTypes2.default.bool,
  initialState: _propTypes2.default.shape({}),
  initializeState: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func,
  onReset: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func.isRequired,
  onSubmitFailed: _propTypes2.default.func,
  resetSubmit: _propTypes2.default.func.isRequired,
  resetValues: _propTypes2.default.func.isRequired,
  setSubmitFailed: _propTypes2.default.func.isRequired,
  setSubmitting: _propTypes2.default.func.isRequired,
  showErrors: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.string,
  values: _propTypes2.default.shape({})
};
Form.defaultProps = {
  afterSubmitState: {},
  initialState: {},
  onChange: function onChange() {},
  onReset: function onReset() {},
  onSubmitFailed: function onSubmitFailed() {}
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    hasFormErrors: (0, _reducers.hasFormErrors)(state),
    values: (0, _reducers.getFormValues)(state)
  };
};

var mapDispatchToProps = {
  initializeState: _controls2.default.initializeState,
  resetValues: _controls2.default.resetValues,
  setPending: _controls2.default.setPending,
  showErrors: _controls2.default.showErrors,

  resetSubmit: _form2.default.resetSubmit,
  setSubmitFailed: _form2.default.setSubmitFailed,
  setSubmitting: _form2.default.setSubmitting
};

exports.default = (0, _store.withNewLocalStore)(_reducers2.default)((0, _store.connect)(mapStateToProps, mapDispatchToProps)(Form));