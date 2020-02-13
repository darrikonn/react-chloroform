import React, {memo} from 'react';

interface PropTypes {
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  text: string;
  type?: 'button' | 'reset' | 'submit';
}

function Button({className, disabled, onClick, id, style, text, type = 'button'}: PropTypes) {
  return (
    <button
      id={id}
      type={type}
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

/*
const mapStateToProps = (state: Store.CombinedState, {type, disabled}: PropTypes) => ({
  disabled: disabled === undefined ? type === SUBMIT && canBeSubmitted(state) : disabled,
});
*/

export default memo(Button);
