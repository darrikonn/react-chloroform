// @ts-nocheck

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import controlActions from '../../src/actions/controls';
import reducers from '../../src/store/reducers';

describe('Blueprint tests', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it('dispatches mountModel action and returns blueprint', () => {
    // Arrange & Act
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));

    // Assert
    expect(store.getState().control.blueprint).toEqual({
      drinks: {
        '*': {
          length: 2,
          value: {
            type: undefined,
            foo: undefined,
          },
        },
      },
    });
  });
});

describe('Store tests', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it('dispatches initializeStore after mount and returns store', () => {
    // Arrange
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    const initialState = {
      'drinks.*': 'allset',
      'foo.bar': 1337,
      'drinks.0.type': 'a bit different',
    };

    // Act
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Assert
    expect(store.getState().control.store).toEqual({
      drinks: {
        value: [
          {
            value: {
              type: {
                value: 'a bit different',
              },
              foo: {
                value: 'allset',
              },
            },
          },
          {
            value: {
              type: {
                value: 'allset',
              },
              foo: {
                value: 'allset',
              },
            },
          },
        ],
      },
      foo: {
        value: {
          bar: {
            value: 1337,
          },
        },
      },
    });
  });

  it('dispatches initializeStore after mount and keeps order', () => {
    // Arrange
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    const initialState = {
      'drinks.0.type': 'a bit different',
      'foo.bar': 1337,
      'drinks.*': 'allset',
    };

    // Act
    store.dispatch(controlActions.initializeState(initialState, {}));

    // Assert
    expect(store.getState().control.store).toEqual({
      drinks: {
        value: [
          {
            value: {
              type: {
                value: 'a bit different',
              },
              foo: {
                value: 'allset',
              },
            },
          },
          {
            value: {
              type: {
                value: 'allset',
              },
              foo: {
                value: 'allset',
              },
            },
          },
        ],
      },
      foo: {
        value: {
          bar: {
            value: 1337,
          },
        },
      },
    });
  });

  it('sets values dot all objects in array', () => {
    // Arrange
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    store.dispatch(controlActions.initializeState({}, {}));

    // Act
    store.dispatch(controlActions.setValue('drinks.*', 'common value'));

    // Assert
    expect(store.getState().control.store).toEqual({
      drinks: {
        value: [
          {
            value: {
              type: {
                value: 'common value',
              },
              foo: {
                value: 'common value',
              },
            },
          },
          {
            value: {
              type: {
                value: 'common value',
              },
              foo: {
                value: 'common value',
              },
            },
          },
        ],
      },
      foo: {
        value: {
          bar: {
            value: undefined,
          },
        },
      },
    });
  });

  it('sets individual values', () => {
    // Arrange
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('foo.bar', undefined, false, undefined));
    store.dispatch(controlActions.initializeState({}, {}));

    // Act
    store.dispatch(controlActions.setValue('drinks.0.type', 'first'));
    store.dispatch(controlActions.setValue('drinks.1.foo', 'second'));
    store.dispatch(controlActions.setValue('foo.bar', 'third'));

    // Assert
    expect(store.getState().control.store).toEqual({
      drinks: {
        value: [
          {
            value: {
              type: {
                value: 'first',
              },
              foo: {
                value: undefined,
              },
            },
          },
          {
            value: {
              type: {
                value: undefined,
              },
              foo: {
                value: 'second',
              },
            },
          },
        ],
      },
      foo: {
        value: {
          bar: {
            value: 'third',
          },
        },
      },
    });
  });
});

describe('Validator tests', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it('mounts models with validators', () => {
    // Arrange
    const validator1 = () => {};
    const validator2 = () => {};
    const validator3 = () => {};

    // Act
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, validator1));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, validator2));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, validator3));

    // Assert
    expect(store.getState().control.validators).toEqual({
      'drinks.*': validator1,
      'drinks.1.type': validator2,
      'drinks.0.foo': validator3,
    });
  });

  it('initializes validators with mount precedence', () => {
    // Arrange
    const validator1 = () => {};
    const validator2 = () => {};
    const validator3 = () => {};
    const validators = {
      'drinks.0.foo': validator2,
      'drinks.0.type': validator3,
    };
    store.dispatch(controlActions.mountModel('drinks.*', undefined, false, validator1));
    store.dispatch(controlActions.mountModel('drinks.0.type', undefined, false, undefined));
    store.dispatch(controlActions.mountModel('drinks.1.type', undefined, false, validator2));
    store.dispatch(controlActions.mountModel('drinks.0.foo', undefined, false, validator3));

    // Act
    store.dispatch(controlActions.initializeState({}, validators));

    // Assert
    expect(store.getState().control.validators).toEqual({
      'drinks.*': validator1,
      'drinks.0.type': validator3,
      'drinks.1.type': validator2,
      'drinks.0.foo': validator2,
    });
  });
});
