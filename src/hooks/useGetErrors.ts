import {useMemo} from 'react';

import {getValidators} from '../store/reducers';
import {useCachedSelector} from '.';

export default (model: string, value: ExplicitAny): string[] => {
  const validators = useCachedSelector(getValidators, model);
  return useMemo(
    () =>
      validators.reduce((acc: string[], validate: Function) => {
        const validation = validate(value);
        if (validation) {
          const [isValid, message] = validation;
          if (!isValid) {
            return [...acc, message];
          }
        }
        return acc;
      }, []),
    [value]
  );
};
