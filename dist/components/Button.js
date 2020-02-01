import React from 'react';
import { SUBMIT } from '../constants/form';
import { canBeSubmitted } from '../store/reducers';
import { connect } from '../store';
function Button(_a) {
    var _b = _a.type, type = _b === void 0 ? 'button' : _b, text = _a.text, className = _a.className, style = _a.style, disabled = _a.disabled, onClick = _a.onClick;
    return (React.createElement("button", { type: type, className: className, style: style, disabled: disabled, onClick: onClick }, text));
}
var mapStateToProps = function (state, _a) {
    var type = _a.type, disabled = _a.disabled;
    return ({
        disabled: disabled === undefined ? type === SUBMIT && canBeSubmitted(state) : disabled,
    });
};
export default connect(mapStateToProps)(Button);
//# sourceMappingURL=Button.js.map