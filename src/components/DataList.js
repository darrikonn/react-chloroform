import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasBeenValidated, hasError} from '../store/reducers';

class DataList extends Control {
  static propTypes = {
    model: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.boolean,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    ).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    const {model, options, placeholder, value} = this.props;

    return (
      <div>
        <input
          list={model}
          onChange={e => this.onChange(e.target.value)}
          placeholder={placeholder}
          value={value || ''}
          {...this.properties()}
        />
        <datalist id={model}>
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </datalist>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
