import React from 'react';
import PropTypes from 'prop-types';

import {SUBMIT} from '../constants/form';
import {canBeSubmitted} from '../store/reducers';
import {connect} from '../store';

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
  disabled: disabled === undefined ? type === SUBMIT && canBeSubmitted(state) : disabled,
});

export default connect(mapStateToProps)(Button);
