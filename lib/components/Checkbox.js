'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Control2 = require('./Control');

var _Control3 = _interopRequireDefault(_Control2);

var _controls = require('../actions/controls');

var _controls2 = _interopRequireDefault(_controls);

var _keywords = require('../constants/keywords');

var _events = require('../constants/events');

var _store = require('../store');

var _reducers = require('../store/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Control) {
  _inherits(Checkbox, _Control);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this._validateModel = function () {
      var _this$props = _this.props,
          group = _this$props.group,
          groupValue = _this$props.groupValue;

      _this.validateModel(group, groupValue);
    }, _this.markValidated = function () {
      var group = _this.props.group;

      _this.props.markValidated(group);
    }, _this.handleOnChange = function (e) {
      var _this$props2 = _this.props,
          group = _this$props2.group,
          model = _this$props2.model;

      var isChecked = e.target.checked;

      if (group && model === _keywords.ALL) {
        _this.handleOnGroupChange(isChecked);
      }

      _this.onChange(isChecked);
    }, _this.handleOnGroupChange = function (isChecked) {
      var _this$props3 = _this.props,
          groupModels = _this$props3.groupModels,
          model = _this$props3.model;

      var groupModelKeys = Object.keys(groupModels);
      if (model === _keywords.ALL) {
        groupModelKeys.forEach(function (m) {
          return _this.onChange(isChecked, m);
        });
      } else if (_keywords.ALL in groupModels) {
        _this.onChange(isChecked && groupModelKeys.filter(function (m) {
          return m !== _keywords.ALL && m !== model && groupModels[m];
        }).length === groupModelKeys.length - 2, _keywords.ALL);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          group = _props.group,
          _props$groupValidateO = _props.groupValidateOn,
          groupValidateOn = _props$groupValidateO === undefined ? _events.MOUNT : _props$groupValidateO,
          groupValidator = _props.groupValidator,
          model = _props.model;

      this.props.setGroup(model, group);

      if (group && model === _keywords.ALL) {
        this.props.initializeGroup(group, groupValidator, groupValidateOn);

        _get(Checkbox.prototype.__proto__ || Object.getPrototypeOf(Checkbox.prototype), 'componentDidMount', this).call(this);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      var _props2 = this.props,
          group = _props2.group,
          groupValue = _props2.groupValue,
          model = _props2.model,
          value = _props2.value;

      if (group && model !== _keywords.ALL) {
        if (oldProps.value !== value) {
          if (value) {
            this.props.updateValue(group, model);
          } else {
            this.props.deleteValue(group, model);
          }
          this.handleOnGroupChange(Boolean(value));
        } else if (oldProps.groupValue !== groupValue) {
          this._validateModel();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          validateOn = _props3.validateOn,
          value = _props3.value;


      return _react2.default.createElement('input', _extends({
        checked: value || false,
        onChange: this.handleOnChange,
        type: 'checkbox'
      }, this.properties(), {
        onClick: validateOn === _events.INPUT ? this.markValidated : undefined,
        onKeyUp: undefined
      }));
    }
  }]);

  return Checkbox;
}(_Control3.default);

Checkbox.propTypes = {
  deleteValue: _propTypes2.default.func.isRequired,
  group: _propTypes2.default.string,
  groupModels: _propTypes2.default.shape({}),
  groupValidateOn: _propTypes2.default.string,
  groupValidator: _propTypes2.default.arrayOf(_propTypes2.default.func),
  groupValue: _propTypes2.default.arrayOf(_propTypes2.default.string),
  initializeGroup: _propTypes2.default.func.isRequired,
  markValidated: _propTypes2.default.func.isRequired,
  model: _propTypes2.default.string.isRequired,
  setGroup: _propTypes2.default.func.isRequired,
  updateValue: _propTypes2.default.func.isRequired,
  validateOn: _propTypes2.default.oneOf([_events.BLUR, _events.FOCUS, _events.INPUT, _events.MOUNT]),
  value: _propTypes2.default.bool
};


var mapStateToProps = function mapStateToProps(state, _ref2) {
  var group = _ref2.group,
      model = _ref2.model,
      validateOn = _ref2.validateOn,
      validator = _ref2.validator;
  return {
    groupModels: (0, _reducers.getGroupModels)(state, group),
    groupValidateOn: validateOn,
    groupValidator: validator,
    groupValue: (0, _reducers.getValue)(state, group),
    hasError: (0, _reducers.hasError)(state, group),
    isValidated: (0, _reducers.hasBeenValidated)(state, group),
    validateOn: (0, _reducers.getValidateOn)(state, group) || validateOn,
    validator: (0, _reducers.getValidator)(state, group) || validator,
    value: (0, _reducers.getValue)(state, model)
  };
};

var mapDispatchToProps = {
  deleteValue: _controls2.default.deleteValue,
  initializeGroup: _controls2.default.initializeGroup,
  markValidated: _controls2.default.markValidated,
  setErrors: _controls2.default.setErrors,
  setGroup: _controls2.default.setGroup,
  setValue: _controls2.default.setValue,
  updateValue: _controls2.default.updateValue
};

exports.default = (0, _store.connect)(mapStateToProps, mapDispatchToProps)(Checkbox);