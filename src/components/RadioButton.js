import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class RadioButton extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.string.isRequired,
    checked: PropTypes.string,
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {id, value, style, checked} = this.props;

    return (
      <input
        type="radio"
        id={id}
        className={this.getClassName()}
        style={style}
        value={value}
        checked={checked === value}
        onChange={e => this.onChange(e.target.value)}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  checked: getValue(state, props.model),
  hasError: hasError(state, props.model),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
