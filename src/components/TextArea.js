import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class TextArea extends Control {
  static propTypes = {
    className: PropTypes.string,
    cols: PropTypes.number,
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
    const {id, placeholder, style, rows, cols, value} = this.props;

    return (
      <textarea
        placeholder={placeholder}
        id={id}
        className={this.getClassName()}
        style={style}
        cols={cols}
        rows={rows}
        value={value}
        onChange={e => this.onChange(e.target.value)}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.model),
  hasError: hasError(state, props.model),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
