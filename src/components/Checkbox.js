import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue} from '../store/reducers';

class Checkbox extends Control {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    style: PropTypes.string,
    value: PropTypes.bool,
  };

  render() {
    const {id, name, className, style, value} = this.props;
    return (
      <input
        type="checkbox"
        className={className}
        style={style}
        id={id}
        name={name}
        checked={value || false}
        onChange={e => this._onChange(e.target.checked)}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  value: getValue(state, props.name),
});

const mapDispatchToProps = {
  setErrors: controlActions.setErrors,
  setValue: controlActions.setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
