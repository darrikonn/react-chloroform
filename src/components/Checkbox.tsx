import React, {useEffect} from 'react';

import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {getValue, isFormInitialized} from '../store/reducers';
import {useWillMount} from '../hooks';

interface PropTypes {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  hasError: boolean;
  id?: string;
  initialized: boolean;
  isValidated: boolean;
  model: string;
  mountModel: Function;
  onChange: Function;
  parseValue: Function;
  setErrors: Function;
  setValidated: Function;
  setValue: Function;
  validator: Function;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  value?: boolean | boolean[];
}
function Checkbox({
  autoFocus,
  className,
  disabled,
  hasError,
  id,
  initialized,
  isValidated,
  model,
  mountModel,
  onChange = () => {},
  parseValue,
  setErrors,
  setValidated,
  setValue,
  style,
  validateOn,
  validator = () => {},
  value,
}: PropTypes) {
  useWillMount(() => mountModel(model, parseValue, validateOn === MOUNT));

  useEffect(() => {
    setErrors(model, validator(parseValue ? parseValue(value) : value));
  }, [value, initialized]);

  const handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(model, e.target.checked);
    onChange(model, e.target.checked);
  };

  const getClassName: () => string = () => {
    return [className, hasError && isValidated ? `CHl3Error ${model}-CHl3Error` : undefined]
      .join(' ')
      .trim();
  };

  const markValidated = () => setValidated(model);

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

const mapStateToProps = (state: Store.CombinedState, {model}: PropTypes) => ({
  value: getValue(state, model),
  initialized: isFormInitialized(state),
});

const mapDispatchToProps = {
  deleteValue: controlActions.deleteValue,
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
  updateValue: controlActions.updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
