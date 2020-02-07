import React, {useLayoutEffect, memo} from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue/*, hasError*/} from '../store/reducers';

interface PropTypes {
  autoFocus?: boolean;
  checked?: string;
  className?: string;
  disabled?: boolean;
  hasError: boolean;
  id?: string;
  isValidated: boolean;
  model: string;
  mountModel: Function;
  onChange: Function;
  parseValue: Function;
  placeholder?: string;
  setValidated: Function;
  setValue: Function;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  value: string | number;
}

function RadioButton({
  autoFocus,
  checked,
  className,
  disabled,
  hasError,
  id,
  isValidated,
  model,
  mountModel,
  onChange = () => {},
  parseValue,
  placeholder,
  setValidated,
  setValue,
  style,
  validateOn,
  value,
}: PropTypes) {
  console.log('RENDERING: radiobutton', model);
  useLayoutEffect(() => {mountModel(model, parseValue, validateOn === MOUNT)}, []);

  const getClassName: () => string = () => {
    return [className, hasError && isValidated ? `CHl3Error ${model}-CHl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(model, e.target.value);
    onChange(model, e.target.value);
  };

  const markValidated = () => setValidated(model);

  return (
    <input
      autoFocus={autoFocus}
      checked={checked === value}
      className={getClassName()}
      disabled={disabled}
      id={id}
      onBlur={validateOn === BLUR ? markValidated : undefined}
      onChange={handleOnChange}
      onFocus={validateOn === FOCUS ? markValidated : undefined}
      onKeyUp={validateOn === INPUT ? markValidated : undefined}
      placeholder={placeholder}
      style={style}
      type="radio"
      value={value}
    />
  );
}

const mapStateToProps = (state: Store.CombinedState, {model}: PropTypes) => ({
  checked: getValue(state, model),
  // hasError: hasError(state, model),
  // parseValue: (x: string | number) => x, // disable parseValue for radio-buttons
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(RadioButton));
