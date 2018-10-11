import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError} from '../store/reducers';

class Select extends Control {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          disabled: PropTypes.boolean,
          name: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }),
        PropTypes.shape({
          disabled: PropTypes.boolean,
          group: PropTypes.arrayOf(
            PropTypes.shape({
              disabled: PropTypes.boolean,
              name: PropTypes.string.isRequired,
              value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
          ).isRequired,
          name: PropTypes.string.isRequired,
        }),
      ])
    ).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    const {options, placeholder, value} = this.props;

    const mappedOptions = options.map(option => {
      if ('group' in option) {
        return (
          <optgroup key={option.name} label={option.name} disabled={option.disabled}>
            {option.group.map(groupOption => (
              <option
                key={groupOption.value}
                value={groupOption.value}
                disabled={groupOption.disabled}
              >
                {groupOption.name}
              </option>
            ))}
          </optgroup>
        );
      }

      return (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.name}
        </option>
      );
    });

    if (placeholder) {
      mappedOptions.unshift(
        <option key={placeholder} value="" disabled>
          {placeholder}
        </option>
      );
    }

    return (
      <select
        onChange={e => this.onChange(e.target.value)}
        value={value || ''}
        {...this.properties()}
      >
        {mappedOptions}
      </select>
    );
  }
}

const mapStateToProps = (state, {model}) => ({
  hasError: hasError(state, model),
  isValidated: hasBeenValidated(state, model),
  value: getValue(state, model),
});

const mapDispatchToProps = {
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
