import { __spreadArrays } from "tslib";
export var isString = function (val) { return typeof val === 'string'; };
export var isObject = function (obj) { return obj && typeof obj === 'object'; };
export var isArray = function (arr) { return Array.isArray(arr); };
export var isNumber = function (number) { return !isNaN(number); };
export var getIndex = function (str) {
    return str.split('.').pop();
};
export var merge = function (arr, value, path) {
    var pos = getIndex(path);
    var size = Math.max(isArray(arr) ? arr.length : 0, isNumber(pos) ? parseInt(pos) + 1 : 0);
    if (pos === '*') {
        return Array(size).fill(value);
    }
    else if (!isNumber(pos)) {
        return value;
    }
    var iPos = parseInt(pos);
    if (iPos >= size) {
        return arr;
    }
    var array = arr || new Array(size);
    return __spreadArrays(array.slice(0, iPos), [
        value
    ], array.slice(iPos + 1));
};
export var mergeDeep = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.reduce(function (prev, obj) {
        if (!obj) {
            return prev;
        }
        Object.keys(obj).forEach(function (key) {
            var pVal = prev[key];
            var oVal = obj[key];
            if (isArray(pVal) && isArray(oVal)) {
                prev[key] = pVal.concat.apply(pVal, oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
};
export var getIn = function (obj) {
    var path = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        path[_i - 1] = arguments[_i];
    }
    return path.reduce(function (accumulator, next) {
        if (!accumulator) {
            return undefined;
        }
        return accumulator[next];
    }, obj);
};
export var arrayToObject = function (array, value) {
    return array.reduceRight(function (obj, next, i) {
        var _a;
        if (next === '*') {
            return i === array.length - 1 ? obj : [obj];
        }
        return _a = {}, _a[next] = obj, _a;
    }, isArray(value) ? value.filter(function (x) { return x !== undefined; }) : value);
};
export var fromDotProp = function (name) { return name && name.replace(/\.[0-9]+/g, '.*'); };
//# sourceMappingURL=utils.js.map