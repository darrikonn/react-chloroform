import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getError, getFormStatus, getValue, hasBeenValidated, hasError} from '../store/reducers';

const withReactChloroform = WrappedComponent => {
  class CustomControl extends Control {
    static propTypes = {
      error: PropTypes.arrayOf(PropTypes.string),
      formStatus: PropTypes.string,
      isValidated: PropTypes.bool,
      model: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    render() {
      const {error, formStatus, isValidated, value = ''} = this.props;

      return (
        <WrappedComponent
          {...this.props}
          error={error}
          onChange={this.onChange}
          showError={isValidated}
          startValidating={this.markValidated}
          chloroformStatus={formStatus}
          value={value}
        />
      );
    }
  }

  const mapStateToProps = (state, {model}) => ({
    error: getError(state, model),
    formStatus: getFormStatus(state),
    hasError: hasError(state, model),
    isValidated: hasBeenValidated(state, model),
    value: getValue(state, model),
  });

  const mapDispatchToProps = {
    markValidated: controlActions.markValidated,
    setErrors: controlActions.setErrors,
    setValue: controlActions.setValue,
  };

  return connect(mapStateToProps, mapDispatchToProps)(CustomControl);
};

export default withReactChloroform;
