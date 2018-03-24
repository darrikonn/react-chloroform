import React from 'react';
import PropTypes from 'prop-types';

import {connect} from '../store';
import {hasFormErrors} from '../store/reducers';

const Button = ({type = 'button', text, className, style, disabled, onClick}) => (
  <button type={type} className={className} style={style} disabled={disabled} onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const mapStateToProps = (state, {type, disabled}) => ({
  disabled: (type === 'submit' && hasFormErrors(state)) || disabled,
});

export default connect(mapStateToProps)(Button);
