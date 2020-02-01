var _a;
import createActions from '.';
import { DELETE_VALUE, INITIALIZE_GROUP, INITIALIZE_STATE, MARK_VALIDATED, MOUNT_MODEL, RESET_VALUES, SET_ERRORS, SET_GROUP, SET_VALUE, SHOW_ERRORS, UPDATE_VALUE, } from '../store/action-types';
var actions = (_a = {},
    _a[DELETE_VALUE] = function (model, value) { return ({ model: model, value: value }); },
    _a[INITIALIZE_GROUP] = function (group, validator, validateOn) { return ({
        group: group,
        validator: validator,
        validateOn: validateOn,
    }); },
    _a[INITIALIZE_STATE] = function (state) { return ({ state: state }); },
    _a[MARK_VALIDATED] = function (model) { return ({ model: model }); },
    _a[MOUNT_MODEL] = function (model, parseValue, validated) { return ({
        model: model,
        parseValue: parseValue,
        validated: validated,
    }); },
    _a[RESET_VALUES] = function (state) { return ({ state: state }); },
    _a[SET_ERRORS] = function (model, errors) { return ({ model: model, errors: errors }); },
    _a[SET_GROUP] = function (model, group) { return ({ model: model, group: group }); },
    _a[SET_VALUE] = function (model, value) { return ({ model: model, value: value }); },
    _a[SHOW_ERRORS] = function () { },
    _a[UPDATE_VALUE] = function (model, value) { return ({ model: model, value: value }); },
    _a);
export default createActions(actions);
//# sourceMappingURL=controls.js.map