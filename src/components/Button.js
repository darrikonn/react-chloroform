import React from 'react';
import PropTypes from 'prop-types';

import {connect} from '../store';
import {hasFormErrors} from '../store/reducers';

const Button = ({type = 'button', text, className, style, disabled}) => (
  <button type={type} className={className} style={style} disabled={disabled}>
    {text}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapStateToProps = state => ({
  disabled: hasFormErrors(state), // check if the form has any errors
});

export default connect(mapStateToProps)(Button);
