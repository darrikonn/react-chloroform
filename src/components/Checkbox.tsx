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
  validator?: Function;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
}

function Checkbox({
  autoFocus,
  className,
  disabled,
  id,
  model,
  onChange = () => {},
  parseValue,
  style,
  validateOn,
  validator = () => {},
}: PropTypes) {
  useWillMount(() => controlActions.mountModel(model, parseValue, validateOn === MOUNT, validator));

  const dispatch = useDispatch();
  const value = useCachedSelector(getValue, model) || '';
  const errors: string[] = useGetErrors(model, value);
  console.log('RENDERING: checkbox', model, errors);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(controlActions.setValue(model, e.target.checked));
    onChange(model, e.target.checked);
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
      checked={(Array.isArray(value) ? value.every(Boolean) : value) || false}
      className={getClassName()}
      disabled={disabled}
      id={id}
      onBlur={validateOn === BLUR ? markValidated : undefined}
      onChange={handleOnChange}
      onClick={validateOn === INPUT ? markValidated : undefined}
      onFocus={validateOn === FOCUS ? markValidated : undefined}
      style={style}
      type="checkbox"
    />
  );
}

/*
const mapStateToProps = (state: Store.CombinedState, {model}: PropTypes) => ({
  value: getValue(state, model),
  errors: [],
  // initialized: isFormInitialized(state),
});

const mapDispatchToProps = {
  deleteValue: controlActions.deleteValue,
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
  updateValue: controlActions.updateValue,
};
*/

export default memo(Checkbox);
