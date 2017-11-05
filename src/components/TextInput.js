import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

class TextInput extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    type: 'text',
    value: '',
  };

  render() {
    const {className, id, name, placeholder, style, type, value} = this.props;

    return (
      <input
        placeholder={placeholder}
        id={id}
        className={className}
        style={style}
        type={type}
        name={name}
        value={value}
        onChange={e => this._onChange(e.target.value)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
