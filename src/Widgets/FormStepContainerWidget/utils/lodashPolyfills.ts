/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmpty = (obj: any) => {
  if (obj == null) return true;

  if (obj instanceof Map || obj instanceof Set) {
    return obj.size === 0;
  }

  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, index) => start + index);

export const times = (n: number) => [...Array(n).keys()];

export const uniq = (array: Array<any>) => [...new Set(array)];
