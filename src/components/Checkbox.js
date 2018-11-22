import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {ALL} from '../constants/keywords';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {
  getValue,
  isFormInitialized,
  hasBeenValidated,
  hasError,
  mountModel,
} from '../store/reducers';

class Checkbox extends Control {
  static propTypes = {
    deleteValue: PropTypes.func.isRequired,
    markValidated: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    validateOn: PropTypes.oneOf([BLUR, FOCUS, INPUT, MOUNT]),
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.bool)]),
  };

  handleOnChange = e => {
    const {model, overriddenValue = true} = this.props;

    this.onChange(e.target.checked);
  };

  render() {
    const {validateOn, value} = this.props;

    return (
      <input
        checked={(Array.isArray(value) ? value.every(Boolean) : value) || false}
        onChange={this.handleOnChange}
        type="checkbox"
        {...this.properties()}
        onClick={validateOn === INPUT ? this.markValidated : undefined}
        onKeyUp={undefined}
      />
    );
  }
}

const mapStateToProps = (state, {model, value, validateOn, validator}) => ({
  value: getValue(state, model),
  initialized: isFormInitialized(state),
  overriddenValue: value,
});

const mapDispatchToProps = {
  deleteValue: controlActions.deleteValue,
  markValidated: controlActions.markValidated,
  mountModel: controlActions.mountModel,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
  updateValue: controlActions.updateValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox);
