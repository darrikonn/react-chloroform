import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class RadioButton extends Control {
  static propTypes = {
    checked: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {checked, disabled, id, style, value} = this.props;

    return (
      <input
        checked={checked === value}
        disabled={disabled}
        className={this.getClassName()}
        id={id}
        onChange={e => this.onChange(e.target.value)}
        style={style}
        type="radio"
        value={value}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  checked: getValue(state, props.model),
  hasError: hasError(state, props.model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
