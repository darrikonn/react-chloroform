import React, {Component} from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withNewLocalStore, connect} from '../store';
import reducers, {getFormValues, getFormErrors, hasFormErrors} from '../store/reducers';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialState: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    initializeState: PropTypes.func.isRequired,
    // setPending: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    setSubmitFailed: PropTypes.func.isRequired,
    resetSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    hasFormErrors: PropTypes.bool,
  };

  static defaultProps = {
    initialState: {},
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const {values, errors, hasFormErrors} = this.props;

    if (hasFormErrors) {
      console.log('here', errors.toJS(), hasFormErrors);
      // this.props.showErrors();
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

  handleReset = () => this.props.resetForm();

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
        {this.props.children}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  values: getFormValues(state),
  errors: getFormErrors(state),
  hasFormErrors: hasFormErrors(state),
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  resetForm: controlActions.resetForm,

  resetSubmit: formActions.resetSubmit,
  // setPending: formActions.setPending,
  setSubmitFailed: formActions.setSubmitFailed,
  setSubmitting: formActions.setSubmitting,
};

export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
