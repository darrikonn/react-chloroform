import React from 'react';
import PropTypes from 'prop-types';

import {updateValue} from '../actions/controls';
import {connect} from '../store';

const TextInput = ({placeholder, id, type='text', name, className, style, value='', updateValue}) =>
  <input
    placeholder={placeholder}
    id={id}
    className={className}
    style={style}
    type={type}
    name={name}
    value={value}
    onChange={(e) => updateValue(name, e.target.value)}
  />;

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email']),
  value: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
};

const mapStateToProps = ({controls}, props) => ({
  value: controls.get(props.name),
});

const mapDispatchToProps = {
  updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
