import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError} from '../store/reducers';

class TextArea extends Control {
  static propTypes = {
    cols: PropTypes.number,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const {cols = 30, placeholder, rows = 10, value = ''} = this.props;

    return (
      <textarea
        cols={cols}
        onChange={e => this.onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea);
