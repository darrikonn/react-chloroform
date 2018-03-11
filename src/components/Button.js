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
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  disabled: props.type === 'submit' && hasFormErrors(state),
});

export default connect(mapStateToProps)(Button);
