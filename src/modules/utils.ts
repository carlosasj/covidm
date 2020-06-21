import { KeysOfType } from '../types/utility';
import { isNumber } from 'util';

export function nextMultipleOf(multipleOf: number, reference: number) {
  return multipleOf * Math.ceil(reference / multipleOf);
}

export function maxOf<T extends unknown>(arr: T[], keys: Array<KeysOfType<T, number>>) {
  //@ts-ignore
  const max: Record<KeysOfType<T, number>, number> = {};
  keys.forEach(k => (max[k] = 0));

  return arr.reduce((acc, d) => {
    keys.forEach(k => {
      const value = d[k] || 0;
      if (isNumber(value) && acc[k] < value) {
        acc[k] = value;
      }
    });
    return acc;
  }, max);
}

export function range(start: number, stop: number, step: number = 1) {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
}
