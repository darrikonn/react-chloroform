import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

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
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    const {options, value, className, id, name, style, placeholder} = this.props;
    const mappedOptions = options.map(option => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ));

    if (placeholder) {
      mappedOptions.unshift(
        <option key={placeholder} value="" disabled>
          {placeholder}
        </option>,
      );
    }

    return (
      <select
        id={id}
        name={name}
        value={value || ''}
        className={className}
        style={style}
        onChange={e => this._onChange(e.target.value)}
      >
        {mappedOptions}
      </select>
    );
  }
}

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.name),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
