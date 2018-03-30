import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import controlActions from '../actions/controls';
import {ALL} from '../constants/keywords';
import {BLUR, FOCUS, INPUT, MOUNT} from '../constants/events';
import {connect} from '../store';
import {
  getGroupModels,
  getValidateOn,
  getValidator,
  getValue,
  hasBeenValidated,
  hasError,
} from '../store/reducers';

class Checkbox extends Control {
  static propTypes = {
    deleteValue: PropTypes.func.isRequired,
    group: PropTypes.string,
    groupModels: PropTypes.shape({}),
    groupValidateOn: PropTypes.string,
    groupValidator: PropTypes.arrayOf(PropTypes.func),
    groupValue: PropTypes.arrayOf(PropTypes.string),
    markValidated: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
    setGroup: PropTypes.func.isRequired,
    setValidateOn: PropTypes.func.isRequired,
    setValidator: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    validateOn: PropTypes.oneOf([BLUR, FOCUS, INPUT, MOUNT]),
    value: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidMount() {
    const {group, groupValidateOn = MOUNT, groupValidator, model} = this.props;
    this.props.setGroup(model, group);

    if (group && model === ALL) {
      this.props.setValidator(group, groupValidator);
      this.props.setValidateOn(group, groupValidateOn);

      super.componentDidMount();
    }
  }

  componentDidUpdate(oldProps) {
    const {group, groupValue, model, value} = this.props;
    if (group && model !== ALL) {
      if (oldProps.value !== value) {
        if (value) {
          this.props.updateValue(group, model);
        } else {
          this.props.deleteValue(group, model);
        }
        this.handleOnGroupChange(Boolean(value));
      } else if (oldProps.groupValue !== groupValue) {
        this._validateModel();
      }
    }
  }

  _validateModel = () => {
    const {group, groupValue} = this.props;
    this.validateModel(group, groupValue);
  };

  markValidated = () => {
    const {group} = this.props;
    this.props.markValidated(group);
  };

  handleOnChange = e => {
    const {group, model} = this.props;
    const isChecked = e.target.checked;

    if (group && model === ALL) {
      this.handleOnGroupChange(isChecked);
    }

    this.onChange(isChecked);
  };

  handleOnGroupChange = isChecked => {
    const {groupModels, model} = this.props;
    const groupModelKeys = Object.keys(groupModels);
    if (model === ALL) {
      groupModelKeys.forEach(m => this.onChange(isChecked, m));
    } else if (ALL in groupModels) {
      this.onChange(
        isChecked &&
          groupModelKeys.filter(m => m !== ALL && m !== model && groupModels[m]).length ===
            groupModelKeys.length - 2,
        ALL,
      );
    }
  };

  render() {
    const {validateOn, value} = this.props;

    return (
      <input
        checked={value || false}
        onChange={this.handleOnChange}
        type="checkbox"
        {...this.properties()}
        onClick={validateOn === INPUT ? this.markValidated : undefined}
        onKeyUp={undefined}
      />
    );
  }
}

const mapStateToProps = (state, {group, model, validateOn, validator}) => ({
  groupModels: getGroupModels(state, group),
  groupValidateOn: validateOn,
  groupValidator: validator,
  groupValue: getValue(state, group),
  hasError: hasError(state, group),
  isValidated: hasBeenValidated(state, group),
  validateOn: getValidateOn(state, group) || validateOn,
  validator: getValidator(state, group) || validator,
  value: getValue(state, model),
});

const mapDispatchToProps = {
  deleteValue: controlActions.deleteValue,
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setGroup: controlActions.setGroup,
  setValidateOn: controlActions.setValidateOn,
  setValidator: controlActions.setValidator,
  setValue: controlActions.setValue,
  updateValue: controlActions.updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
