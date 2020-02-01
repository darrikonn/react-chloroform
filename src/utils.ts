export const isString = (val: ExplicitAny) => typeof val === 'string';

export const isObject = (obj: ExplicitAny) => obj && typeof obj === 'object';

export const isArray = (arr: ExplicitAny) => Array.isArray(arr);

export const isNumber = (number: ExplicitAny) => !isNaN(number);

export const getIndex = (str: string): string => {
  return str.split('.').pop() as string;
};

export const merge = (arr: [], value: Primitive, path: string) => {
  const pos: string = getIndex(path);
  const size = Math.max(isArray(arr) ? arr.length : 0, isNumber(pos) ? parseInt(pos) + 1 : 0);
  if (pos === '*') {
    return Array(size).fill(value);
  } else if (!isNumber(pos)) {
    return value;
  }

  const iPos: number = parseInt(pos as string);
  if (iPos >= size) {
    return arr;
  }

  const array = arr || new Array(size);
  return [
    ...array.slice(0, iPos),
    value,
    ...array.slice(iPos + 1)
  ];
};

export const mergeDeep = (...objects: {[key: string]: ExplicitAny}[]) =>
  objects.reduce((prev: {[key: string]: ExplicitAny}, obj: {[key: string]: ExplicitAny}) => {
    if (!obj) {
      return prev;
    }
    Object.keys(obj).forEach((key: string) => {
      const pVal: ExplicitAny = prev[key];
      const oVal: ExplicitAny = obj[key];

      if (isArray(pVal) && isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});

export const getIn = (obj: {[key: string]: ExplicitAny}, ...path: string[]): ExplicitAny =>
  path.reduce(
    (accumulator: {[key: string]: ExplicitAny}, next: string) => {
      if (!accumulator) {
        return undefined;
      }
      return accumulator[next];
    }, obj);

export const arrayToObject = (array: [], value: Scalar | []) =>
  array.reduceRight(
    (obj: {}, next: string, i: number) => {
      if (next === '*') {
        return i === array.length - 1 ? obj : [obj];
      }
      return {[next]: obj};
    }, isArray(value) ? (value as []).filter((x: Scalar) => x !== undefined) : value
  );

export const fromDotProp = (name: string): string => name && name.replace(/\.[0-9]+/g, '.*');
