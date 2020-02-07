import React from 'react';
import {Provider, connect as reduxConnect} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

export const withLocalStore = () => <P extends object>(WrappedComponent: React.ComponentType<P> | ExplicitAny) =>
  (props: P) =>
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <WrappedComponent {...props as P} />
    </Provider>;

export const connect = reduxConnect;

export const compose = (...funcs: Function[]) => {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return (arg: ExplicitAny) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
};
