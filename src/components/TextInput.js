import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class TextInput extends Control {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email']),
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const {placeholder, id, type, name} = this.props;

    return (
      React.createElement('input',
        {
          placeholder,
          id,
          type,
          name,
          value: this._getValue(),
          onChange: (e) => this._onChange(e.target.value),
        },
      )
    );
  }
}

export default TextInput;
