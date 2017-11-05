import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

class RadioButton extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.string.isRequired,
    checked: PropTypes.string,
  };

  render() {
    const {id, name, value, className, style, checked} = this.props;

    return (
      <input
        type="radio"
        id={id}
        className={className}
        style={style}
        name={name}
        value={value}
        checked={checked === value}
        onChange={e => this._onChange(e.target.value)}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  checked: getValue(state, props.name),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
