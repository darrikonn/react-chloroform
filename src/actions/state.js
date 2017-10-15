import {SET_PENDING} from '../store/action-types';

export const setPending = (name, pending) => (dispatch) => {
  dispatch({
    type: SET_PENDING,
    payload: {
      name,
      pending,
    },
  });
};
