import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class DataList extends Control {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.boolean,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    ).isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    const {disabled, id, model, options, placeholder, style, value} = this.props;

    return (
      <div>
        <input
          className={this.getClassName()}
          disabled={disabled}
          id={id}
          list={model}
          onChange={e => this.onChange(e.target.value)}
          placeholder={placeholder}
          style={style}
          value={value || ''}
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

const mapStateToProps = (state, props) => ({
  hasError: hasError(state, props.model),
  value: getValue(state, props.model),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
