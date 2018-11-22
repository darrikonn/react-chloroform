import {isString} from '../utils';

export const parseValidators = (validator = [], value) =>
  validator.reduce((errorList, nextValidator) => {
    const validatedValue = nextValidator(value);
    return [...errorList, ...(isString(validatedValue) ? [validatedValue] : [])];
  }, []);
