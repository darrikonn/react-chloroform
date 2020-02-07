import React, {useLayoutEffect, memo} from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError, isFormInitialized} from '../store/reducers';

interface PropTypes {
  autoFocus?: boolean;
  className?: string;
  cols?: number;
  disabled?: boolean;
  hasError: boolean;
  id?: string;
  isValidated: boolean;
  model: string;
  mountModel: Function;
  onChange: Function;
  parseValue: Function;
  placeholder?: string;
  rows?: number;
  setValidated: Function;
  setValue: Function;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  value?: string | number;
}

function TextArea({
  autoFocus,
  className,
  cols = 30,
  disabled,
  hasError,
  id,
  isValidated,
  model,
  mountModel,
  onChange = () => {},
  parseValue,
  placeholder,
  rows = 10,
  setValidated,
  setValue,
  style,
  validateOn,
  value = '',
}: PropTypes) {
  console.log('RENDERING: textarea', model);
  useLayoutEffect(() => {mountModel(model, parseValue, validateOn === MOUNT)}, []);

  const getClassName: () => string = () => {
    return [className, hasError && isValidated ? `CHl3Error ${model}-CHl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const handleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(model, e.target.value);
    onChange(model, e.target.value);
  };

  const markValidated = () => setValidated(model);

  return (
    <textarea
      cols={cols}
      rows={rows}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(TextArea));
