import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Control from './Control';
import controlActions from '../actions/controls';
import {connect} from '../store';
import {getValue, getGroupModels, hasError} from '../store/reducers';

const ALL = 'all';

class Checkbox extends Control {
  static propTypes = {
    deleteValue: PropTypes.func.isRequired,
    group: PropTypes.string,
    groupModels: PropTypes.instanceOf(Immutable.Map),
    model: PropTypes.string.isRequired,
    setGroup: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    value: PropTypes.bool,
  };

  componentDidMount() {
    const {group, model} = this.props;
    this.props.setGroup(model, group);
  }

  componentDidUpdate(oldProps) {
    const {group, model, value} = this.props;
    if (group && model !== ALL && oldProps.value !== value) {
      if (value) {
        this.props.updateValue(group, model);
      } else {
        this.props.deleteValue(group, model);
      }
      this.handleOnGroupChange(Boolean(value));
    }
  }

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
    if (model === ALL) {
      groupModels.keySeq().forEach(m => this.onChange(isChecked, m));
    } else if (groupModels.get(ALL)) {
      this.onChange(
        isChecked &&
          groupModels.filter((m, key) => key !== ALL && key !== model && m.get('value')).size ===
            groupModels.size - 2,
        ALL,
      );
    }
  };

  render() {
    const {value} = this.props;

    return (
      <input
        checked={value || false}
        onChange={this.handleOnChange}
        type="checkbox"
        {...this.properties()}
      />
    );
  }
}

const mapStateToProps = (state, {group, model}) => ({
  groupModels: group && getGroupModels(state, group),
  hasError: hasError(state, model),
  value: getValue(state, model),
});

const mapDispatchToProps = {
  deleteValue: controlActions.deleteValue,
  markValidated: controlActions.markValidated,
  setErrors: controlActions.setErrors,
  setGroup: controlActions.setGroup,
  setValue: controlActions.setValue,
  updateValue: controlActions.updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
