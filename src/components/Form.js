import React, {Component} from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withNewLocalStore, connect} from '../store';
import reducers, {getFormValues, getFormErrors, hasFormErrors} from '../store/reducers';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    errors: PropTypes.shape({}),
    hasFormErrors: PropTypes.bool,
    initialState: PropTypes.shape({}),
    initializeState: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    resetSubmit: PropTypes.func.isRequired,
    resetValues: PropTypes.func.isRequired,
    setSubmitFailed: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    style: PropTypes.string,
    values: PropTypes.shape({}),
  };

  static defaultProps = {
    initialState: {},
    onReset: function() {},
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const {values, errors, hasFormErrors} = this.props;

    if (hasFormErrors) {
      console.log('here', errors.toJS(), hasFormErrors);
      // TODO: this.props.showErrors();
      return;
    }

    // this.props.setPending(this.props.model);
    try {
      this.props.setSubmitting();
      await this.props.onSubmit(values.toJS());
    } catch (err) {
      console.log(err);
      this.props.setSubmitFailed();
    } finally {
      this.props.resetSubmit();
      console.log('finally');
    }
  };

  handleReset = async e => {
    e.preventDefault();

    this.props.resetValues(this.props.initialState);
    this.props.onReset();
  };

  render() {
    const {children, className, style} = this.props;

    return (
      <form
        className={className}
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
  errors: getFormErrors(state),
  hasFormErrors: hasFormErrors(state),
  values: getFormValues(state),
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  resetValues: controlActions.resetValues,
  setPending: controlActions.setPending,

  resetSubmit: formActions.resetSubmit,
  setSubmitFailed: formActions.setSubmitFailed,
  setSubmitting: formActions.setSubmitting,
};

export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
