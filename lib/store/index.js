'use strict';

exports.__esModule = true;
exports.connect = exports.withNewLocalStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-multi-comp: 0 */

var createStore = function createStore(reducer) {
  var state = void 0;
  var listeners = [];

  var getState = function getState() {
    return state;
  };

  var dispatch = function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(function (listener) {
      return listener();
    });
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  };

  // get the reducer to return the initial value
  dispatch({});

  return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};

var withNewLocalStore = exports.withNewLocalStore = function withNewLocalStore(reducers) {
  return function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(LocalStore, _Component);

      function LocalStore(props) {
        _classCallCheck(this, LocalStore);

        var _this = _possibleConstructorReturn(this, (LocalStore.__proto__ || Object.getPrototypeOf(LocalStore)).call(this, props));

        _this.store = createStore(reducers);
        return _this;
      }

      _createClass(LocalStore, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return {
            store: this.store
          };
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return LocalStore;
    }(_react.Component), _class.childContextTypes = {
      store: _propTypes2.default.shape({
        subscribe: _propTypes2.default.func,
        dispatch: _propTypes2.default.func,
        getState: _propTypes2.default.func
      })
    }, _temp;
  };
};

var connect = exports.connect = function connect(stateToProps, dispatchToProps) {
  return function (WrappedComponent) {
    var _class2, _temp2;

    return _temp2 = _class2 = function (_Component2) {
      _inherits(Connect, _Component2);

      function Connect(props, _ref) {
        var store = _ref.store;

        _classCallCheck(this, Connect);

        var _this2 = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props));

        _this2.mapStateToProps = function () {
          return stateToProps ? stateToProps(_this2.store.getState(), _this2.props) : {};
        };

        _this2.mapDispatchToProps = function () {
          return dispatchToProps ? Object.keys(dispatchToProps).reduce(function (obj, f) {
            return _extends({}, obj, _defineProperty({}, f, function () {
              return dispatchToProps[f].apply(dispatchToProps, arguments)(_this2.store.dispatch);
            }));
          }, {}) : {};
        };

        _this2.unsubscribe = store.subscribe(function () {
          return _this2.forceUpdate();
        });
        _this2.store = store;
        return _this2;
      }

      _createClass(Connect, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.unsubscribe();
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.mapStateToProps(), this.mapDispatchToProps()));
        }
      }]);

      return Connect;
    }(_react.Component), _class2.contextTypes = {
      store: _propTypes2.default.shape({
        subscribe: _propTypes2.default.func,
        dispatch: _propTypes2.default.func,
        getState: _propTypes2.default.func
      })
    }, _temp2;
  };
};