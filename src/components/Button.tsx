import React from 'react';

import {SUBMIT} from '../constants/form';
import {canBeSubmitted} from '../store/reducers';
import {connect} from '../store';

interface PropTypes {
  type?: 'button' | 'reset' | 'submit';
  text: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({type = 'button', text, className, style, disabled, onClick}: PropTypes) {
  return (
    <button type={type} className={className} style={style} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

const mapStateToProps = (state: Store.CombinedState, {type, disabled}: PropTypes) => ({
  disabled: disabled === undefined ? type === SUBMIT && canBeSubmitted(state) : disabled,
});

export default connect(mapStateToProps)(Button);
