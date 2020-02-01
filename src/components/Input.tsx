import React from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError, isFormInitialized} from '../store/reducers';
import {useWillMount} from '../hooks';

interface PropTypes {
  autoFocus?: boolean;
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
  type?: 'text' | 'email' | 'password' | 'number';
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  value?: string | number;
}

function Input({
  autoFocus,
  className,
  disabled,
  hasError,
  id,
  isValidated,
  model,
  mountModel,
  onChange,
  parseValue,
  placeholder,
  setValidated,
  setValue,
  style,
  type,
  validateOn,
  value,
}: PropTypes) {
  useWillMount(() => mountModel(model, parseValue, validateOn === MOUNT));

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
      className={getClassName()}
      disabled={disabled}
      id={id}
      onBlur={validateOn === BLUR ? markValidated : undefined}
      onChange={handleOnChange}
      onFocus={validateOn === FOCUS ? markValidated : undefined}
      onKeyUp={validateOn === INPUT ? markValidated : undefined}
      placeholder={placeholder}
      style={style}
      type={type}
      value={value}
    />
  );
}

const mapStateToProps = (state: Store.CombinedState, {model}: PropTypes) => ({
  hasError: hasError(state, model),
  initialized: isFormInitialized(state),
  isValidated: hasBeenValidated(state, model),
  value: getValue(state, model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
