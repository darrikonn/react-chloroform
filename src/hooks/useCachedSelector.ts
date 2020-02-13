import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export default (selector: () => ExplicitAny, ...args: ExplicitAny[]): ExplicitAny => {
  const cachedSelector = useMemo(
    selector,
    []
  )

  return useSelector((state: Store.CombinedState) =>
    cachedSelector(state, ...args)
  )
};
