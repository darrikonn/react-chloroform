// eslint-disable-next-line import/prefer-default-export
export const parseValidators = (validator, value) =>
  validator.reduce((errorList, nextValidator) => {
    const validatedValue = nextValidator(value);
    return [...errorList, ...(validatedValue ? [validatedValue] : errorList)];
  }, []);
