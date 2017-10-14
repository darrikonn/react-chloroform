import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

class Select extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    ).isRequired,
    style: PropTypes.string,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
  };

  componentDidMount() {
    if (this.props.initialValue) {
      this._onChange(this.props.initialValue);
    }
  }

  render() {
    const {className, id, name, style, value, placeholder} = this.props;

    const options = this.props.options.map(option => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ));

    if (placeholder) {
      options.unshift(
        <option key={placeholder} value="" disabled>
          {placeholder}
        </option>,
      );
    }

    return (
      <select
        id={id}
        name={name}
        value={this._getValue() || ""}
        className={className}
        style={style}
        onChange={e => this._onChange(e.target.value)}
      >
        {options}
      </select>
    );
  }
}

export default Select;
