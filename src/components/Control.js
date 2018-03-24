import {Component} from 'react';
import PropTypes from 'prop-types';

import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {parseValidators} from '../services/validators';

class Control extends Component {
  static propTypes = {
    className: PropTypes.string,
    hasError: PropTypes.bool,
    id: PropTypes.string,
    isValidated: PropTypes.bool,
    markValidated: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
    setErrors: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    style: PropTypes.string,
    validateOn: PropTypes.oneOf([BLUR, FOCUS, INPUT, MOUNT]),
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
    const {validateOn = MOUNT} = this.props;

    this._validateModel();
    if (validateOn === MOUNT) {
      this.markValidated();
    }
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
    const {className, hasError, isValidated} = this.props;
    return [className, hasError && isValidated ? 'error' : undefined].join(' ').trim();
  };

  markValidated = () => {
    const {model} = this.props;

    this.props.markValidated(model);
  };

  properties = () => {
    const {disabled, id, style, validateOn} = this.props;

    return {
      className: this.getClassName(),
      disabled,
      id,
      style,

      onBlur: validateOn === BLUR ? this.markValidated : undefined,
      onFocus: validateOn === FOCUS ? this.markValidated : undefined,
      onKeyUp: validateOn === INPUT ? this.markValidated : undefined,
    };
  };

  _validateModel = () => {
    const {model, validator, value} = this.props;
    this.props.setErrors(model, parseValidators(validator, value));
  };
}

export default Control;
