import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError} from '../store/reducers';

class FormInput extends Control {
  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    type: 'text',
    value: '',
  };

  render() {
    const {placeholder, type, value} = this.props;

    return (
      <input
        onChange={e => this.onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
        {...this.properties()}
      />
    );
  }
}

const mapStateToProps = (state, {model}) => ({
  hasError: hasError(state, model),
  isValidated: hasBeenValidated(state, model),
  value: getValue(state, model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
