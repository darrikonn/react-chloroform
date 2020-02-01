import React, { useEffect } from 'react';
import controlActions from '../actions/controls';
import formActions from '../actions/form';
import { withNewLocalStore, connect } from '../store';
import reducers, { getFormValues, hasFormErrors } from '../store/reducers';
function Form(_a) {
    var _b = _a.afterSubmitState, afterSubmitState = _b === void 0 ? {} : _b, children = _a.children, className = _a.className, hasFormErrors = _a.hasFormErrors, _c = _a.initialState, initialState = _c === void 0 ? {} : _c, initializeState = _a.initializeState, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.onReset, onReset = _e === void 0 ? function () { } : _e, onResetState = _a.onResetState, onSubmit = _a.onSubmit, _f = _a.onSubmitFailed, onSubmitFailed = _f === void 0 ? function () { } : _f, resetSubmit = _a.resetSubmit, resetValues = _a.resetValues, setSubmitFailed = _a.setSubmitFailed, setSubmitted = _a.setSubmitted, setSubmitting = _a.setSubmitting, showErrors = _a.showErrors, style = _a.style, values = _a.values;
    useEffect(function () {
        initializeState(initialState);
    }, []);
    var handleChange = function (event) {
        onChange(event);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        if (hasFormErrors) {
            showErrors();
            return;
        }
        // this.props.setPending(this.props.model);
        setSubmitting();
        Promise.resolve()
            .then(function () { return onSubmit(values); })
            .then(function () {
            initializeState(afterSubmitState);
            setSubmitted();
        })
            .catch(function (err) {
            setSubmitFailed();
            onSubmitFailed(err);
        })
            .finally(function () { return resetSubmit(); });
    };
    var handleReset = function (event) {
        event.preventDefault();
        resetValues(onResetState || initialState);
        onReset();
    };
    console.log("***", values);
    return (React.createElement("form", { className: className, onChange: handleChange, onReset: handleReset, onSubmit: handleSubmit, style: style }, children));
}
var mapStateToProps = function (state) { return ({
    hasFormErrors: hasFormErrors(state),
    values: getFormValues(state),
}); };
var mapDispatchToProps = {
    initializeState: controlActions.initializeState,
    resetValues: controlActions.resetValues,
    setPending: controlActions.setPending,
    showErrors: controlActions.showErrors,
    resetSubmit: formActions.resetSubmit,
    setSubmitFailed: formActions.setSubmitFailed,
    setSubmitted: formActions.setSubmitted,
    setSubmitting: formActions.setSubmitting,
};
export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
//# sourceMappingURL=Form.js.map