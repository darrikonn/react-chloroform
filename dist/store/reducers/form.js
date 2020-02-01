import { __assign } from "tslib";
import { FAILED, HAS_ERRORS, SUBMITTED, SUBMITTING } from '../../constants/form';
import { RESET_SUBMIT, SET_SUBMITTED, SET_SUBMITTING, SET_SUBMIT_FAILED, INITIALIZE_STATE, } from '../action-types';
var initialState = {
    status: undefined,
    initialized: false,
};
export default (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_SUBMITTED:
            return __assign(__assign({}, state), { status: SUBMITTED });
        case SET_SUBMITTING:
            return __assign(__assign({}, state), { status: SUBMITTING });
        case SET_SUBMIT_FAILED:
            return __assign(__assign({}, state), { status: FAILED });
        case RESET_SUBMIT:
            return initialState;
        case INITIALIZE_STATE:
            return __assign(__assign({}, state), { initialized: true });
        default:
            return state;
    }
});
export var getStatus = function (state, hasFormErrors) {
    return state.status || (hasFormErrors ? HAS_ERRORS : '');
};
export var getInitialized = function (state) { return state.initialized; };
//# sourceMappingURL=form.js.map