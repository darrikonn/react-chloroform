import React, {memo} from 'react';
import {useDispatch} from 'react-redux';

import {useCachedSelector, useGetErrors, useWillMount} from '../hooks';
import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
//import {getValue2 as getValue/*, hasError*/} from '../store/reducers';
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
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  validator?: Function;
  value: string | number;
}

function RadioButton({
  autoFocus,
  className,
  disabled,
  id,
  model,
  onChange = () => {},
  parseValue,
  placeholder,
  style,
  validateOn,
  validator,
  value,
}: PropTypes) {
  useWillMount(() => controlActions.mountModel(model, parseValue, validateOn === MOUNT, validator));

  const dispatch = useDispatch();
  const checked = useCachedSelector(getValue, model) || '';
  const errors: string[] = useGetErrors(model, value);
  // console.log('RENDERING: radiobutton', model);

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

/*
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
*/

export default memo(RadioButton);
