import {UPDATE_VALUE} from '../store/action-types';

// eslint-disable-next-line import/prefer-default-export
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
