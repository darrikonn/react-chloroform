import { __assign } from "tslib";
var camelCase = function (str) { return str.toLowerCase().replace(/(_\w)/g, function (m) { return m[1].toUpperCase(); }); };
var actionCreator = function (_a) {
    var type = _a.type, payload = _a.payload;
    return function (dispatch) {
        return dispatch({
            type: type,
            payload: payload,
        });
    };
};
var createActions = function (actions) {
    return Object.keys(actions).reduce(function (createdActions, type) {
        var _a;
        return (__assign(__assign({}, createdActions), (_a = {}, _a[camelCase(type)] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return actionCreator({ type: type, payload: actions[type].apply(actions, args) });
        }, _a)));
    }, {});
};
export default createActions;
//# sourceMappingURL=index.js.map