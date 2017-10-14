import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class TextInput extends Control {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email']),
    className: PropTypes.string,
    style: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const {placeholder, id, type, name, className, style} = this.props;

    return (
      <input
        placeholder={placeholder}
        id={id}
        className={className}
        style={style}
        type={type}
        name={name}
        value={this._getValue()}
        onChange={(e) => this._onChange(e.target.value)}
      />
    );
  }
}

export default TextInput;
