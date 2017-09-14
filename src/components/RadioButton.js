import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class RadioButton extends Control {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string,
  }

  render() {
    const {id, name, value} = this.props;

    return (
      React.createElement('input',
        {
          type: 'radio',
          id,
          name,
          value,
          checked: this._getValue() === value,
          onChange: (e) => this._onChange(e.target.value),
        },
      )
    );
  }
}

export default RadioButton;
