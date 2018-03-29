import React, {Component} from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withNewLocalStore, connect} from '../store';
import reducers, {getFormValues, hasFormErrors} from '../store/reducers';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    hasFormErrors: PropTypes.bool,
    initialState: PropTypes.shape({}),
    initializeState: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onSubmitFailed: PropTypes.func,
    resetSubmit: PropTypes.func.isRequired,
    resetValues: PropTypes.func.isRequired,
    setSubmitFailed: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    showErrors: PropTypes.func.isRequired,
    style: PropTypes.string,
    values: PropTypes.shape({}),
  };

  static defaultProps = {
    initialState: {},
    onChange: function() {},
    onReset: function() {},
    onSubmitFailed: function() {},
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleChange = e => {
    this.props.onChange(e);
  };

  handleSubmit = e => {
    e.preventDefault();

    const {values, hasFormErrors} = this.props;

    if (hasFormErrors) {
      this.props.showErrors();
      return;
    }

    // this.props.setPending(this.props.model);
    this.props.setSubmitting();
    Promise.resolve()
      .then(() => this.props.onSubmit(values.toJS()))
      .catch(err => {
        this.props.setSubmitFailed();
        this.props.onSubmitFailed(err);
      })
      .finally(() => this.props.resetSubmit());
  };

  handleReset = e => {
    e.preventDefault();

    this.props.resetValues(this.props.initialState);
    this.props.onReset();
  };

  render() {
    const {children, className, style} = this.props;

    return (
      <form
        className={className}
        onChange={this.handleChange}
        onReset={this.handleReset}
        onSubmit={this.handleSubmit}
        style={style}
      >
        {children}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  hasFormErrors: hasFormErrors(state),
  values: getFormValues(state),
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  resetValues: controlActions.resetValues,
  setPending: controlActions.setPending,
  showErrors: controlActions.showErrors,

  resetSubmit: formActions.resetSubmit,
  setSubmitFailed: formActions.setSubmitFailed,
  setSubmitting: formActions.setSubmitting,
};

export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
