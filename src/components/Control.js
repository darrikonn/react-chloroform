import {Component} from 'react';
import PropTypes from 'prop-types';

import {parseValidators} from '../services/validators';

class Control extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    setErrors: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    validator: PropTypes.arrayOf(PropTypes.func.isRequired),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    validator: [],
  };

  constructor(props) {
    super(props);
  }

  _onChange = value => {
    this.props.setErrors(this.props.name, parseValidators(this.props.validator, value));
    this.props.setValue(this.props.name, value);
  };
}

export default Control;
