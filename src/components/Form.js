import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import controlActions from '../actions/controls';
import stateActions from '../actions/state';
import {withNewLocalStore, connect} from '../store';
import reducers from '../store/reducers';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialState: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    controls: PropTypes.instanceOf(Immutable.Map),
    initializeState: PropTypes.func.isRequired,
    setPending: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    setSubmitFailed: PropTypes.func.isRequired,
    resetStates: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialState: {},
    name: 'local',
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.setPending(this.props.name);
    try {
      this.props.onSubmit(this.props.controls.toJS());
      this.props.setSubmitting(this.props.name);
    } catch (err) {
      console.log(err);
      this.props.setSubmitFailed(this.props.name);
    } finally {
      this.props.resetStates();
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

const mapStateToProps = ({controls}) => ({
  controls,
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  resetForm: controlActions.resetForm,

  resetStates: stateActions.resetStates,
  setPending: stateActions.setPending,
  setSubmitFailed: stateActions.setSubmitFailed,
  setSubmitting: stateActions.setSubmitting,
};

export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
