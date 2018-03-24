import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError} from '../store/reducers';

const withReactChloroform = WrappedComponent => {
  class CustomControl extends Control {
    static propTypes = {
      model: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
      value: '',
    };

    render() {
      const {value} = this.props;

      return <WrappedComponent {...this.props} onChange={this.onChange} value={value} />;
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

  return connect(mapStateToProps, mapDispatchToProps)(CustomControl);
};

export default withReactChloroform;
