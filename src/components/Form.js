import React, {Component} from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withNewLocalStore, connect} from '../store';
import reducers, {getValues, getErrors, hasError} from '../store/reducers';

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
    hasError: PropTypes.bool,
  };

  static defaultProps = {
    initialState: {},
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const {values, errors} = this.props;

    // this.props.setPending(this.props.model);
    console.log('here', errors.toJS(), this.props.hasError);
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
  values: getValues(state),
  errors: getErrors(state),
  hasError: hasError(state),
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
