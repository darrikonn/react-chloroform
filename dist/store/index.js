/* eslint react/no-multi-comp: 0 */
import { __assign, __extends } from "tslib";
import React, { Component } from 'react';
var createStore = function (reducer) {
    var state;
    var listeners = [];
    var getState = function () { return state; };
    var dispatch = function (action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) { return listener(); });
    };
    var subscribe = function (listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) { return l !== listener; });
        };
    };
    // get the reducer to return the initial value
    dispatch({});
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};
export var withNewLocalStore = function (reducers) { return function (WrappedComponent) { var _a; return _a = /** @class */ (function (_super) {
        __extends(LocalStore, _super);
        function LocalStore(props) {
            var _this = _super.call(this, props) || this;
            _this.store = createStore(reducers);
            return _this;
        }
        LocalStore.prototype.getChildContext = function () {
            return {
                store: this.store,
            };
        };
        LocalStore.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({}, this.props));
        };
        return LocalStore;
    }(Component)),
    _a.childContextTypes = {
        store: {
            subscribe: function () { return null; },
            dispatch: function () { return null; },
            getState: function () { return null; },
        }
    },
    _a; }; };
export var connect = function (stateToProps, dispatchToProps) { return function (WrappedComponent) { var _a; return _a = /** @class */ (function (_super) {
        __extends(Connect, _super);
        function Connect(props, _a) {
            var store = _a.store;
            var _this = _super.call(this, props) || this;
            _this.mapStateToProps = function () { return (stateToProps ? stateToProps(_this.store.getState(), _this.props) : {}); };
            _this.mapDispatchToProps = function () {
                return dispatchToProps
                    ? Object.keys(dispatchToProps).reduce(function (obj, f) {
                        var _a;
                        return (__assign(__assign({}, obj), (_a = {}, _a[f] = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return dispatchToProps[f].apply(dispatchToProps, args)(_this.store.dispatch);
                        }, _a)));
                    }, {})
                    : {};
            };
            _this.unsubscribe = store.subscribe(function () { return _this.forceUpdate(); });
            _this.store = store;
            return _this;
        }
        Connect.prototype.componentWillUnmount = function () {
            this.unsubscribe();
        };
        Connect.prototype.render = function () {
            return (React.createElement(WrappedComponent, __assign({}, this.props, this.mapStateToProps(), this.mapDispatchToProps())));
        };
        return Connect;
    }(Component)),
    _a.contextTypes = {
        store: {
            subscribe: function () { return null; },
            dispatch: function () { return null; },
            getState: function () { return null; },
        }
    },
    _a; }; };
//# sourceMappingURL=index.js.map