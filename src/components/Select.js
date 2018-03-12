import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class Select extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          disabled: PropTypes.boolean,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }),
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          disabled: PropTypes.boolean,
          group: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              disabled: PropTypes.boolean,
            }),
          ).isRequired,
        }),
      ]),
    ).isRequired,
    style: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    const {options, value, id, style, placeholder} = this.props;
    const mappedOptions = options.map(option => {
      if ('group' in option) {
        return (
          <optgroup key={option.name} label={option.name} disabled={option.disabled}>
            {option.group.map(groupOption => (
              <option key={groupOption.value} value={groupOption.value} disabled={groupOption.disabled}>
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
        </option>,
      );
    }

    return (
      <select
        id={id}
        value={value || ''}
        className={this.getClassName()}
        style={style}
        onChange={e => this.onChange(e.target.value)}
      >
        {mappedOptions}
      </select>
    );
  }
}

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.model),
  hasError: hasError(state, props.model),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
