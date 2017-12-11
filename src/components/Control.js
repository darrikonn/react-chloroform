import {Component} from 'react';
import PropTypes from 'prop-types';

import {parseValidators} from '../services/validators';

class Control extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    setErrors: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    validator: PropTypes.arrayOf(PropTypes.func.isRequired),
  };

  static defaultProps = {
    validator: [],
  };

  constructor(props) {
    super(props);
  }

  _onChange = value => {
    this.props.setErrors(this.props.model, parseValidators(this.props.validator, value));
    this.props.setValue(this.props.model, value);
  };
}

export default Control;
