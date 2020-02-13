import React, {memo} from 'react';
import {useDispatch} from 'react-redux';

import {useCachedSelector, useGetErrors, useWillMount} from '../hooks';
import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {getValue/*, hasBeenValidated, isFormInitialized*/} from '../store/reducers';

interface PropTypes {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  model: string;
  onChange: Function;
  parseValue: Function;
  placeholder?: string;
  style?: React.CSSProperties;
  type?: 'text' | 'email' | 'password' | 'number';
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  validator?: Function;
}

function Input({
  autoFocus,
  className,
  disabled,
  id,
  model,
  onChange = () => {},
  parseValue,
  placeholder,
  style,
  type,
  validateOn,
  validator,
}: PropTypes) {
  useWillMount(() => controlActions.mountModel(model, parseValue, validateOn === MOUNT, validator));

  const dispatch = useDispatch();
  const value = useCachedSelector(getValue, model) || '';
  const errors: string[] = useGetErrors(model, value);

  console.log('RENDERING: input', model, value);
  console.log("ERRORS", model, errors);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(controlActions.setValue(model, e.target.value));
    onChange(model, e.target.value);
  };

  const getClassName: () => string = () => {
    return [className, errors.length < 1] // && isValidated ? `CHCl3Error ${model}-CHCl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const markValidated = () => {}; // isValidated || setValidated(model);

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

/*
const mapStateToProps = (state: Store.CombinedState, {model}: PropTypes) => ({
  initialized: isFormInitialized(state),
  isValidated: hasBeenValidated(state, model),
  // value: getValue(state, model),
  gValidators: () => getValidators(state, model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  // setValue: controlActions.setValue,
};
*/

export default memo(Input);
