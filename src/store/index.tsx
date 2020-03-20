import React from 'react';
// import {Provider, connect as reduxConnect} from 'react-redux';
// import {Store} from 'redux';

export const Store = React.createContext({});

// export const withLocalStore = (store: Store) => <P extends object>(WrappedComponent: React.ComponentType<P> | ExplicitAny) =>
//   (props: P) =>
//     <Provider store={store}>
//       <WrappedComponent {...props as P} />
//     </Provider>;
//
// export const connect = reduxConnect;

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

/*
// import React from 'react'
import {
  // Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux'

const MyContext = React.createContext(null)

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
*/
