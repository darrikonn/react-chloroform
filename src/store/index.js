import React, {Component} from 'react';
import PropTypes from 'prop-types';

const createStore = (reducer) => {
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
