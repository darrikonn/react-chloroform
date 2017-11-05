import React from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

const RadioButton = ({id, name, value, className, style, setValue, checked}) => (
  <input
    type="radio"
    id={id}
    className={className}
    style={style}
    name={name}
    value={value}
    checked={checked === value}
    onChange={e => setValue(name, e.target.value)}
  />
);

RadioButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  value: PropTypes.string.isRequired,
  checked: PropTypes.string,
  setValue: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  checked: getValue(state, props.name),
});

const mapDispatchToProps = {
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
