import React, {memo} from 'react';
import {useDispatch} from 'react-redux';

import {useCachedSelector, useGetErrors, useWillMount} from '../hooks';
import controlActions from '../actions/controls';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
// import {getValue2 as getValue, isFormInitialized, hasBeenValidated, hasError} from '../store/reducers';
import {getValue/*, hasBeenValidated, isFormInitialized*/} from '../store/reducers';

interface PropTypes {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  model: string;
  onChange: Function;
  options: {
    disabled?: boolean,
    name?: string,
    value: string | number,
  }[];
  parseValue: Function;
  placeholder?: string;
  style?: React.CSSProperties;
  validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
  validator?: Function;
}

function DataList({
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
  console.log('RENDERING: datalist', model);

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

export default memo(DataList);
