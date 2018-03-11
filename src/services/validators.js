export const isString = val => typeof val === 'string';

export const parseValidators = (validator = [], value) =>
  validator.reduce((errorList, nextValidator) => {
    const validatedValue = nextValidator(value);
    return [...errorList, ...(isString(validatedValue) ? [validatedValue] : [])];
  }, []);
