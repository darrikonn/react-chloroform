import {UPDATE_VALUE, INITIALIZE_STATE} from '../store/action-types';

export const updateValue = (name, value) => (dispatch) => {
  dispatch({
    type: UPDATE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

export const initializeState = state => dispatch => {
  dispatch({
    type: INITIALIZE_STATE,
    payload: {
      state,
    },
  });
};

