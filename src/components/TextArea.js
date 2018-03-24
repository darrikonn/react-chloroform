import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class TextArea extends Control {
  static propTypes = {
    cols: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    style: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    cols: 30,
    rows: 10,
    value: '',
  };

  render() {
    const {cols, disabled, id, placeholder, rows, style, value} = this.props;

    return (
      <textarea
        className={this.getClassName()}
        cols={cols}
        disabled={disabled}
        id={id}
        onChange={e => this.onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={style}
        value={value}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  hasError: hasError(state, props.model),
  value: getValue(state, props.model),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
