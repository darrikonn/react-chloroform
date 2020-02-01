import { __assign } from "tslib";
import { HAS_ERRORS, SUBMITTING } from '../../constants/form';
import control, * as fromControl from './control';
import form, * as fromForm from './form';
var combineReducers = function (reducers) { return function (state, action) {
    if (state === void 0) { state = {}; }
    return Object.keys(reducers).reduce(function (nextState, key) {
        var _a;
        return (__assign(__assign({}, nextState), (_a = {}, _a[key] = reducers[key](state[key], action), _a)));
    }, {});
}; };
export default combineReducers({
    control: control,
    form: form,
});
/*
 * Form
 */
export var getFormStatus = function (state) {
    return fromForm.getStatus(state.form, hasFormErrors(state));
};
export var canBeSubmitted = function (state) {
    return [HAS_ERRORS, SUBMITTING].includes(getFormStatus(state));
};
export var isFormInitialized = function (state) {
    return fromForm.getInitialized(state.form);
};
/*
 * Control
 */
export var getError = function (state, model) {
    return fromControl.getError(state.control, model);
};
export var getFormValues = function (state) { return fromControl.getValues(state.control); };
export var getValue = function (state, model) {
    return fromControl.getValue(state.control, model);
};
export var hasBeenValidated = function (state, model) {
    return fromControl.hasBeenValidated(state.control, model);
};
export var hasError = function (state, model) {
    return fromControl.hasError(state.control, model);
};
export var hasFormErrors = function (state) { return fromControl.hasErrors(state.control); };
//# sourceMappingURL=index.js.map