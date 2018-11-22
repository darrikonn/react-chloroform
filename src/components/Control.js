import {Component} from 'react';
import PropTypes from 'prop-types';

import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {parseValidators} from '../services/validators';

class Control extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hasError: PropTypes.bool,
    id: PropTypes.string,
    isValidated: PropTypes.bool,
    initialized: PropTypes.bool,
    markValidated: PropTypes.func.isRequired,
    mountModel: PropTypes.func,
    parseValue: PropTypes.func,
    model: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    setErrors: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    style: PropTypes.string,
    validateOn: PropTypes.oneOf([BLUR, FOCUS, INPUT, MOUNT]),
    validator: PropTypes.arrayOf(PropTypes.func.isRequired),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    onChange: function() {},
    validator: [],
    validateOn: MOUNT,
  };

  constructor(props) {
    super(props);
    props.mountModel(props.model, props.parseValue, props.validateOn === MOUNT);
  }

  componentDidUpdate(oldProps) {
    const {initialized, value} = this.props;
    if ((!oldProps.initialized && initialized) || (oldProps.value !== value)) {
      this.validateModel();
    }
  }

  onChange = (value, model = this.props.model) => {
    this.props.setValue(model, value);
    this.props.onChange(model, value);
  };

  getClassName = () => {
    const {className, hasError, isValidated, model} = this.props;
    return [
      className,
      hasError && isValidated
        ? `react-chloroform-error ${model}-react-chloroform-error`
        : undefined,
    ]
      .join(' ')
      .trim();
  };

  markValidated = () => {
    const {model} = this.props;
    this.props.markValidated(model);
  };

  properties = () => {
    const {autoFocus, disabled, id, style, validateOn} = this.props;

    return {
      autoFocus,
      className: this.getClassName(),
      disabled,
      id,
      style,

      onBlur: validateOn === BLUR ? this.markValidated : undefined,
      onFocus: validateOn === FOCUS ? this.markValidated : undefined,
      onKeyUp: validateOn === INPUT ? this.markValidated : undefined,
    };
  };

  validateModel = () => {
    const {model, value, validator, parseValue} = this.props;
    this.props.setErrors(model, parseValidators(validator, parseValue ? parseValue(value) : value));
  };
}

export default Control;
