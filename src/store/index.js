/* eslint react/no-multi-comp: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // get the reducer to return the initial value
  dispatch({});

  return {getState, dispatch, subscribe};
};

export const withNewLocalStore = reducers => WrappedComponent => {
  return class LocalStore extends Component {
    static childContextTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func,
        dispatch: PropTypes.func,
        getState: PropTypes.func,
      }),
    };

    constructor(props) {
      super(props);

      this.store = createStore(reducers);
    }

    getChildContext() {
      return {
        store: this.store,
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export const connect = (stateToProps, dispatchToProps) => WrappedComponent => {
  return class Connect extends Component {
    static contextTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func,
        dispatch: PropTypes.func,
        getState: PropTypes.func,
      }),
    };

    constructor(props, {store}) {
      super(props);

      this.unsubscribe = store.subscribe(() => this.forceUpdate());
      this.store = store;
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    mapStateToProps = () => (stateToProps ? stateToProps(this.store.getState(), this.props) : {});

    mapDispatchToProps = () =>
      dispatchToProps
        ? Object.keys(dispatchToProps).reduce(
            (obj, f) => ({
              ...obj,
              [f]: (...args) => dispatchToProps[f](...args)(this.store.dispatch),
            }),
            {},
          )
        : {};

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.mapStateToProps()}
          {...this.mapDispatchToProps()}
        />
      );
    }
  };
};
