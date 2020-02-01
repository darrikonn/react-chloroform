/* eslint react/no-multi-comp: 0 */

import React, {Component} from 'react';

export interface ContextStore {
  subscribe: Function;
  dispatch: Function;
  getState: Function;
}

type Context = {
  store: ContextStore,
};

const createStore = (reducer: Function) => {
  let state: Store.CombinedState;
  let listeners: Function[] = [];

  const getState: Function = () => state;

  const dispatch = (action: {[key: string]: Store.Action}) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener: Function) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // get the reducer to return the initial value
  dispatch({});

  return {getState, dispatch, subscribe};
};

export const withNewLocalStore = (reducers: Function) => <P extends object>(WrappedComponent: React.ComponentType<P> | ExplicitAny) =>
  class LocalStore extends Component<P> {
    store: ContextStore;

    static childContextTypes = {
      store: {
        subscribe: () => null,
        dispatch: () => null,
        getState: () => null,
      } as ContextStore
    }

    constructor(props: P) {
      super(props);

      this.store = createStore(reducers);
    }

    getChildContext() {
      return {
        store: this.store,
      };
    }

    render() {
      return <WrappedComponent {...this.props as P} />;
    }
  };

export const connect = (stateToProps?: Function, dispatchToProps?: {[key: string]: Function}) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class Connect extends Component<P> {
    unsubscribe: Function;
    store: ContextStore;

    static contextTypes = {
      store: {
        subscribe: () => null,
        dispatch: () => null,
        getState: () => null,
      } as ContextStore
    }

    constructor(props: P, {store}: Context) {
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
            (obj: {}, f: string) => ({
              ...obj,
              [f]: (...args: {[key: string]: Function}[]) =>
                dispatchToProps[f](...args)(this.store.dispatch),
            }),
            {}
          )
        : {};

    render() {
      return (
        <WrappedComponent
          {...this.props as P}
          {...this.mapStateToProps()}
          {...this.mapDispatchToProps()}
        />
      );
    }
  };
