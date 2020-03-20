import {useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';

export default (func: Function) => {
  const dispatch = useDispatch();

  return useLayoutEffect(() => {
    dispatch(func());
  }, []);
};
