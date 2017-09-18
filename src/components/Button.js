import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type = 'button', text}) =>
  React.createElement('button',
    {
      type,
    },
    text
  );

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
