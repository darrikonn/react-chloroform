import React from 'react';
import controlActions from '../actions/controls';
import { BLUR, FOCUS, INPUT, MOUNT } from '../constants/events';
import { connect } from '../store';
import { getValue, hasBeenValidated, hasError, isFormInitialized } from '../store/reducers';
import { useWillMount } from '../hooks';
function Input(_a) {
    var autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, hasError = _a.hasError, id = _a.id, isValidated = _a.isValidated, model = _a.model, mountModel = _a.mountModel, onChange = _a.onChange, parseValue = _a.parseValue, placeholder = _a.placeholder, setValidated = _a.setValidated, setValue = _a.setValue, style = _a.style, type = _a.type, validateOn = _a.validateOn, value = _a.value;
    useWillMount(function () { return mountModel(model, parseValue, validateOn === MOUNT); });
    var getClassName = function () {
        return [className, hasError && isValidated ? "CHl3Error " + model + "-CHl3Error" : undefined]
            .join(' ')
            .trim();
    };
    var handleOnChange = function (e) {
        setValue(model, e.target.value);
        onChange(model, e.target.value);
    };
    var markValidated = function () { return setValidated(model); };
    return (React.createElement("input", { autoFocus: autoFocus, className: getClassName(), disabled: disabled, id: id, onBlur: validateOn === BLUR ? markValidated : undefined, onChange: handleOnChange, onFocus: validateOn === FOCUS ? markValidated : undefined, onKeyUp: validateOn === INPUT ? markValidated : undefined, placeholder: placeholder, style: style, type: type, value: value }));
}
var mapStateToProps = function (state, _a) {
    var model = _a.model;
    return ({
        hasError: hasError(state, model),
        initialized: isFormInitialized(state),
        isValidated: hasBeenValidated(state, model),
        value: getValue(state, model),
    });
};
var mapDispatchToProps = {
    markValidated: controlActions.markValidated,
    mountModel: controlActions.mountModel,
    setErrors: controlActions.setErrors,
    setValue: controlActions.setValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
//# sourceMappingURL=Input.js.map