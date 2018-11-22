export const isString = val => typeof val === 'string';

export const isObject = obj => obj && typeof obj === 'object';

export const isArray = arr => Array.isArray(arr);

export const isNumber = number => !isNaN(number);

export const getIndex = str => {
  const pos = str.split('.').pop();
  if (isNumber(pos)) {
    return parseInt(pos);
  }
  return pos;
};

export const merge = (arr, value, path) => {
  const pos = getIndex(path);
  const size = Math.max(isArray(arr) ? arr.length : 0, isNumber(pos) ? pos + 1 : 0);
  if (pos === '*') {
    return Array(size).fill(value);
  } else if (!isNumber(pos)) {
    return value;
  } else if (pos >= size) {
    return arr;
  }

  const array = arr || new Array(size);
  return [
    ...array.slice(0, pos),
    value,
    ...array.slice(pos + 1)
  ];
};

export const mergeDeep = (...objects) =>
  objects.reduce((prev, obj) => {
    if (!obj) {
      return prev;
    }
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

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

export const getIn = (obj, ...path) =>
	path.reduce((accumulator, next) => (!accumulator ? undefined : accumulator[next]), obj);

export const arrayToObject = (array, value) =>
  array.reduceRight(
    (obj, next, i) => (next === '*' ? i === array.length - 1 ? obj : [obj] : {[next]: obj}),
    isArray(value) ? value.filter(x => x !== undefined) : value
  );

export const fromDotProp = name => name && name.replace(/\.[0-9]+/g, '.*');
