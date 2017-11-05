import React from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';
import {parseValidators} from '../services/validators';

const TextInput = ({
  className,
  id,
  name,
  placeholder,
  setErrors,
  style,
  type = 'text',
  setValue,
  validator = [],
  value = '',
}) => (
  <input
    placeholder={placeholder}
    id={id}
    className={className}
    style={style}
    type={type}
    name={name}
    value={value}
    onChange={e => {
      const val = e.target.value;
      setErrors(name, parseValidators(validator, val));
      setValue(name, val);
    }}
  />
);

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email']),
  setValue: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validator: PropTypes.arrayOf(PropTypes.func.isRequired),
};

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.name),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
