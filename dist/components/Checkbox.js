import React, { useEffect } from 'react';
import controlActions from '../actions/controls';
import { BLUR, FOCUS, INPUT, MOUNT } from '../constants/events';
import { connect } from '../store';
import { getValue, isFormInitialized } from '../store/reducers';
import { useWillMount } from '../hooks';
function CheckBox(_a) {
    var autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, hasError = _a.hasError, id = _a.id, initialized = _a.initialized, isValidated = _a.isValidated, model = _a.model, mountModel = _a.mountModel, onChange = _a.onChange, parseValue = _a.parseValue, setErrors = _a.setErrors, setValidated = _a.setValidated, setValue = _a.setValue, style = _a.style, validateOn = _a.validateOn, _b = _a.validator, validator = _b === void 0 ? function () { } : _b, value = _a.value;
    useWillMount(function () { return mountModel(model, parseValue, validateOn === MOUNT); });
    useEffect(function () {
        setErrors(model, validator(parseValue ? parseValue(value) : value));
    }, [value, initialized]);
    var handleOnChange = function (e) {
        setValue(model, e.target.checked);
        onChange(model, e.target.checked);
    };
    var getClassName = function () {
        return [className, hasError && isValidated ? "CHl3Error " + model + "-CHl3Error" : undefined]
            .join(' ')
            .trim();
    };
    var markValidated = function () { return setValidated(model); };
    return (React.createElement("input", { autoFocus: autoFocus, checked: (Array.isArray(value) ? value.every(Boolean) : value) || false, className: getClassName(), disabled: disabled, id: id, onBlur: validateOn === BLUR ? markValidated : undefined, onChange: handleOnChange, onClick: validateOn === INPUT ? markValidated : undefined, onFocus: validateOn === FOCUS ? markValidated : undefined, style: style, type: "checkbox" }));
}
var mapStateToProps = function (state, _a) {
    var model = _a.model, value = _a.value;
    return ({
        value: getValue(state, model),
        initialized: isFormInitialized(state),
        overriddenValue: value,
    });
};
var mapDispatchToProps = {
    deleteValue: controlActions.deleteValue,
    markValidated: controlActions.markValidated,
    mountModel: controlActions.mountModel,
    setErrors: controlActions.setErrors,
    setValue: controlActions.setValue,
    updateValue: controlActions.updateValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
//# sourceMappingURL=Checkbox.js.map