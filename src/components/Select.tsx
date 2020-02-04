import React from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue, isFormInitialized, hasBeenValidated, hasError} from '../store/reducers';
import {useWillMount} from '../hooks';

interface PropTypes {
  options: ({
    disabled?: boolean,
    name: string,
    value: string | number,
  } | {
    disabled?: boolean,
    name: string,
    group: {
      disabled?: boolean,
      name: string,
      value: string | number,
    }[],
  })[]
  placeholder?: string;
  value?: string;
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
  setValidated: Function;
  setValue: Function;
  style: React.CSSProperties;
  type?: 'text' | 'email' | 'password' | 'number';
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
}

function Select({
  autoFocus,
  className,
  disabled,
  hasError,
  id,
  isValidated,
  model,
  mountModel,
  onChange,
  options,
  parseValue,
  placeholder,
  setValidated,
  setValue,
  style,
  validateOn,
  value,
}: PropTypes) {
  useWillMount(() => mountModel(model, parseValue, validateOn === MOUNT));

  const getClassName: () => string = () => {
    return [className, hasError && isValidated ? `CHl3Error ${model}-CHl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(model, e.target.value);
    onChange(model, e.target.value);
  };

  const markValidated = () => setValidated(model);

  const mappedOptions = options.map(option => {
    if ('group' in option) {
      return (
        <optgroup key={option.name} label={option.name} disabled={option.disabled}>
          {option.group.map(groupOption => (
            <option
              key={groupOption.value}
              value={groupOption.value}
              disabled={groupOption.disabled}
            >
              {groupOption.name}
            </option>
          ))}
        </optgroup>
      );
    }

    return (
      <option key={option.value} value={option.value} disabled={option.disabled}>
        {option.name}
      </option>
    );
  });

  if (placeholder) {
    mappedOptions.unshift(
      <option key={placeholder} value="" disabled>
        {placeholder}
      </option>
    );
  }

  return (
    <select
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
      value={value || ''}
    >
      {mappedOptions}
    </select>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
