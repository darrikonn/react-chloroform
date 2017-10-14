import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class RadioButton extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    const {id, name, value, className, style} = this.props;

    return (
      <input
        type="radio"
        id={id}
        className={className}
        style={style}
        name={name}
        value={value}
        checked={this._getValue() === value}
        onChange={(e) => this._onChange(e.target.value)}
      />
    );
  }
}

export default RadioButton;
