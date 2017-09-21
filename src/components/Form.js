import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {UPDATE_VALUE} from '../store/action-types';
import createStore from '../store';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialState: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialState: {},
  };

  static childContextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func,
      dispatch: PropTypes.func,
      getState: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    const reducer = (state = Immutable.fromJS(props.initialState), action) => {
      const {payload} = action;
      switch (action.type) {
        case UPDATE_VALUE:
          return state.set(payload.name, payload.value);
        default:
          return state;
      }
    };
    this.store = createStore(reducer);
  }

  getChildContext() {
    return {
      store: this.store,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.store.getState().toJS());
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

export default Form;
