import React, {memo, useLayoutEffect} from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue, isFormInitialized, hasBeenValidated, hasError} from '../store/reducers';

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
  options: {
    disabled?: boolean,
    name?: string,
    value: string | number,
  }[];
  parseValue: Function;
  placeholder?: string;
  setValidated: Function;
  setValue: Function;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  value?: string;
}

function DataList({
  autoFocus,
  className,
  disabled,
  hasError,
  id,
  isValidated,
  model,
  mountModel,
  onChange = () => {},
  options,
  parseValue,
  placeholder,
  setValidated,
  setValue,
  style,
  validateOn,
  value,
}: PropTypes) {
  console.log('RENDERING: datalist', model);
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
    <div>
      <input
        autoFocus={autoFocus}
        className={getClassName()}
        disabled={disabled}
        id={id}
        list={model}
        onBlur={validateOn === BLUR ? markValidated : undefined}
        onChange={handleOnChange}
        onFocus={validateOn === FOCUS ? markValidated : undefined}
        onKeyUp={validateOn === INPUT ? markValidated : undefined}
        placeholder={placeholder}
        style={style}
        value={value || ''}
      />
      <datalist id={model}>
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.name}
          </option>
        ))}
      </datalist>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(DataList));
