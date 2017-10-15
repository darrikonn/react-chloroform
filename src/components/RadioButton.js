import React from 'react';
import PropTypes from 'prop-types';

import {updateValue} from '../actions/controls';
import {connect} from '../store';

const RadioButton = ({id, name, value, className, style, updateValue, checked}) =>
  <input
    type="radio"
    id={id}
    className={className}
    style={style}
    name={name}
    value={value}
    checked={checked === value}
    onChange={(e) => updateValue(name, e.target.value)}
  />;

RadioButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  value: PropTypes.string.isRequired,
}

const mapStateToProps = ({controls}, props) => ({
  checked: controls.get(props.name),
});

const mapDispatchToProps = {
  updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
