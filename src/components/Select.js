import React from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import {connect} from '../store';

const Select = ({options, value, updateValue, className, id, name, style, placeholder}) => {
  const mappedOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.name}
    </option>
  ));

  if (placeholder) {
    mappedOptions.unshift(
      <option key={placeholder} value="" disabled>
        {placeholder}
      </option>,
    );
  }

  return (
    <select
      id={id}
      name={name}
      value={value || ''}
      className={className}
      style={style}
      onChange={e => updateValue(name, e.target.value)}
    >
      {mappedOptions}
    </select>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  style: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
};

const mapStateToProps = ({controls}, props) => ({
  value: controls.get(props.name),
});

const mapDispatchToProps = {
  updateValue: controlActions.updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
