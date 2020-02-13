// @ts-nocheck

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import controlActions from '../../src/actions/controls';
import reducers, {getValue, getValidators, getFormValues} from '../../src/store/reducers';

describe('Control selectors tests', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it('gets value from objects', () => {
    // Arrange
    const initialState = {
      'drinks.*': 'allset',
      'foo.bar': 1337,
      'drinks.0.type': 'a bit different',
    };
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Act
    const drinks0TypeValue = getValue()(store.getState(), 'drinks.0.type');
    const drinks1TypeValue = getValue()(store.getState(), 'drinks.1.type');
    const drinks0FooValue = getValue()(store.getState(), 'drinks.0.foo');
    const drinks1FooValue = getValue()(store.getState(), 'drinks.1.foo');
    const fooBarValue = getValue()(store.getState(), 'foo.bar');

    // Assert
    expect(drinks0TypeValue).toEqual('a bit different');
    expect(drinks1TypeValue).toEqual('allset');
    expect(drinks0FooValue).toEqual('allset');
    expect(drinks1FooValue).toEqual('allset');
    expect(fooBarValue).toEqual(1337);
  });

  it('returns undefined if not all values are the same', () => {
    // Arrange
    const initialState = {
      'drinks.*': 'allset',
      'drinks.0.type': 'a bit different',
    };
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Act
    const drinksValue = getValue()(store.getState(), 'drinks.*');

    // Assert
    expect(drinksValue).toEqual(undefined);
  });

  it('returns the value if all values are the same', () => {
    // Arrange
    const initialState = {
      'drinks.*': 'allset',
    };
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Act
    const drinksValue = getValue()(store.getState(), 'drinks.*');

    // Assert
    expect(drinksValue).toEqual('allset');
  });
});

describe('Form selectors tests', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it('gets value from objects', () => {
    // Arrange
    const initialState = {
      'drinks.*': 'allset',
      'foo.bar': 1337,
      'drinks.0.type': 'a bit different',
    };
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Act
    const result = getFormValues()(store.getState());

    // Assert
    expect(result).toEqual({
      drinks: [
        {
          type: 'a bit different',
          foo: 'allset',
        },
        {
          type: 'allset',
          foo: 'allset',
        },
      ],
      foo: {
        bar: 1337,
      },
    });
  });

  it('returns undefined for unset values', () => {
    // Arrange
    const initialState = {
      'drinks.1': 'isset',
      foo: 1337,
    };
    store.dispatch(controlActions.mountModel('drinks.0', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo', undefined, false, undefined));
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Act
    const result = getFormValues()(store.getState());

    // Assert
    expect(result).toEqual({
      drinks: [undefined, 'isset'],
      foo: 1337,
    });
  });
});
