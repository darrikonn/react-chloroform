import {UPDATE_VALUE} from '../store/action-types';

export const updateValue = (name, value) =>
  (dispatch) => {
    dispatch({
      type: UPDATE_VALUE,
      payload: {
        name,
        value,
      },
    });
  };
