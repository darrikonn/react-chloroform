import React from 'react';
import PropTypes from 'prop-types';

import {updateValue} from '../actions/controls';
import {connect} from '../store';

const Checkbox = ({id, name, className, style, value, updateValue}) =>
  <input
    type="checkbox"
    className={className}
    style={style}
    id={id}
    name={name}
    checked={value || false}
    onChange={(e) => updateValue(name, e.target.checked)}
  />;

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  value: PropTypes.bool,
};

const mapStateToProps = ({controls}, props) => ({
  value: controls.get(props.name),
});

const mapDispatchToProps = {
  updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
