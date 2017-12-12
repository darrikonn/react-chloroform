import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, hasError} from '../store/reducers';

class Checkbox extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    model: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.bool,
  };

  render() {
    const {id, style, value} = this.props;
    return (
      <input
        type="checkbox"
        className={this.getClassName()}
        style={style}
        id={id}
        checked={value || false}
        onChange={e => this.onChange(e.target.checked)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
