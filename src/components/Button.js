import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type = 'button', text}) => {
  return (
    <button type={type}>{text}</button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
