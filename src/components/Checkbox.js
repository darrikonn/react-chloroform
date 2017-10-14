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
    const {id, name, className, style} = this.props;

    return (
      <input
        type="checkbox"
        className={className}
        style={style}
        id={id}
        name={name}
        checked={this._getValue() || false}
        onChange={(e) => this._onChange(e.target.checked)}
      />
    );
  }
}

export default Checkbox;
