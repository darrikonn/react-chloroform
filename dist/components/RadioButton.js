import React from 'react';
import controlActions from '../actions/controls';
import { BLUR, FOCUS, INPUT, MOUNT } from '../constants/events';
import { connect } from '../store';
import { getValue, hasError } from '../store/reducers';
import { useWillMount } from '../hooks';
function RadioButton(_a) {
    var autoFocus = _a.autoFocus, checked = _a.checked, className = _a.className, disabled = _a.disabled, hasError = _a.hasError, id = _a.id, isValidated = _a.isValidated, model = _a.model, mountModel = _a.mountModel, onChange = _a.onChange, parseValue = _a.parseValue, placeholder = _a.placeholder, setValidated = _a.setValidated, setValue = _a.setValue, style = _a.style, validateOn = _a.validateOn, value = _a.value;
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
    return (React.createElement("input", { autoFocus: autoFocus, checked: checked === value, className: getClassName(), disabled: disabled, id: id, onBlur: validateOn === BLUR ? markValidated : undefined, onChange: handleOnChange, onFocus: validateOn === FOCUS ? markValidated : undefined, onKeyUp: validateOn === INPUT ? markValidated : undefined, placeholder: placeholder, style: style, type: "radio", value: value }));
}
var mapStateToProps = function (state, _a) {
    var model = _a.model;
    return ({
        checked: getValue(state, model),
        hasError: hasError(state, model),
        parseValue: function (x) { return x; },
    });
};
var mapDispatchToProps = {
    markValidated: controlActions.markValidated,
    mountModel: controlActions.mountModel,
    setErrors: controlActions.setErrors,
    setValue: controlActions.setValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
//# sourceMappingURL=RadioButton.js.map