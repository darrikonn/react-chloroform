import React from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

const Checkbox = ({id, name, className, style, value, setValue}) => (
  <input
    type="checkbox"
    className={className}
    style={style}
    id={id}
    name={name}
    checked={value || false}
    onChange={e => setValue(name, e.target.checked)}
  />
);

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  value: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.name),
});

const mapDispatchToProps = {
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
