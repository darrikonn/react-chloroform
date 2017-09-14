import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class Checkbox extends Control {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const {id, name} = this.props;

    return (
      React.createElement('input',
        {
          type: 'checkbox',
          id,
          name,
          checked: this._getValue() || false,
          onChange: (e) => this._onChange(e.target.checked),
        },
      )
    );
  }
}

export default Checkbox;
