import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class DataList extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
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
    const {model, options, value, id, style, placeholder} = this.props;

    return (
      <div>
        <input
          list={model}
          id={id}
          value={value || ''}
          className={this.getClassName()}
          style={style}
          onChange={e => this.onChange(e.target.value)}
          placeholder={placeholder}
        />
        <datalist id={model}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </datalist>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
