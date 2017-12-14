import {Component} from 'react';
import PropTypes from 'prop-types';

import {parseValidators} from '../services/validators';

class Control extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    model: PropTypes.string.isRequired,
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

  componentDidMount() {
    this._validateModel();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this._validateModel();
    }
  }

  onChange = (value, model = this.props.model) => {
    const {validator} = this.props;
    this.props.setErrors(model, parseValidators(validator, value));
    this.props.setValue(model, value);
  };

  getClassName = () => {
    const {hasError, className} = this.props;
    return [className, hasError ? 'error' : undefined].join(' ').trim();
  };

  _validateModel = () => {
    const {model, validator, value} = this.props;
    this.props.setErrors(model, parseValidators(validator, value));
  };
}

export default Control;
