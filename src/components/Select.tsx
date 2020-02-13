import React, {memo} from 'react';
import {useDispatch} from 'react-redux';

import {useCachedSelector, useGetErrors, useWillMount} from '../hooks';
import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
// import {getValue2 as getValue, isFormInitialized, hasBeenValidated, hasError} from '../store/reducers';
import {getValue/*, hasBeenValidated, isFormInitialized*/} from '../store/reducers';

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
  id?: string;
  model: string;
  onChange: Function;
  parseValue: Function;
  style: React.CSSProperties;
  type?: 'text' | 'email' | 'password' | 'number';
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  validator?: Function;
}

function Select({
  autoFocus,
  className,
  disabled,
  id,
  model,
  onChange = () => {},
  options,
  parseValue,
  placeholder,
  style,
  validateOn,
  validator,
}: PropTypes) {
  useWillMount(() => controlActions.mountModel(model, parseValue, validateOn === MOUNT, validator));

  const dispatch = useDispatch();
  const value = useCachedSelector(getValue, model) || '';
  const errors: string[] = useGetErrors(model, value);
  console.log('RENDERING: select', model);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(controlActions.setValue(model, e.target.value));
    onChange(model, e.target.value);
  };

  const getClassName: () => string = () => {
    return [className, errors.length < 1] // && isValidated ? `CHCl3Error ${model}-CHCl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const markValidated = () => {}; // isValidated || setValidated(model);

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

/*
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
*/

export default memo(Select);
