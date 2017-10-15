import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {initializeState} from '../actions/controls';
import {setPending} from '../actions/state';
import {withNewLocalStore, connect} from '../store';
import reducers from '../store/reducers';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialState: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    controls: PropTypes.instanceOf(Immutable.Map),
  };

  static defaultProps = {
    initialState: {},
    name: 'local',
  };

  componentDidMount() {
    this.props.initializeState(this.props.initialState);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // setPending(this.props.name, true)(this.store.dispatch);
    try {
      this.props.onSubmit(this.props.controls.toJS());
      // setSubmitting(this.props.name, true)(this.store.dispatch);
    } catch (err) {
      console.log(err);
      // setSubmitFailed(this.props.name, true)(this.store.dispatch);
    } finally {
      // this.props.resetState()(this.store.dispatch);
      console.log('finally');
    }
  };

  handleReset = (e) => {
    console.log(e);
    e.preventDefault();
  };

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
  initializeState,
};

export default withNewLocalStore(reducers)(
  connect(mapStateToProps, mapDispatchToProps)(Form)
);
