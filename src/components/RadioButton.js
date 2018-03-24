import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class RadioButton extends Control {
  static propTypes = {
    checked: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {checked, value} = this.props;

    return (
      <input
        checked={checked === value}
        onChange={e => this.onChange(e.target.value)}
        type="radio"
        value={value}
        {...this.properties()}
      />
    );
  }
}

const mapStateToProps = (state, {model}) => ({
  checked: getValue(state, model),
  hasError: hasError(state, model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
