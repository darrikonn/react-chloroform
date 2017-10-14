import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type = 'button', text, className, style}) => (
  <button type={type} className={className} style={style}>
    {text}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;
