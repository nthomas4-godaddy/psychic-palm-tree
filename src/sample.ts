// sample.ts
console.log('This is a sample JS file.');

/**
 * Capitalize first letter of a string.
 * @param str The input string.
 * @returns The input string with the first character capitalized.
 */
export function capitalize(str: string | null | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns A deep-cloned copy of the object.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Debounce a function by delay ms.
 * @param fn Function to debounce.
 * @param delay Delay in ms.
 * @returns Debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle a function by limit ms.
 * @param fn Function to throttle.
 * @param limit Time limit in ms.
 * @returns Throttled function.
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Generate a random string of given length.
 * @param length The length of the string (default: 8).
 * @returns A random alphanumeric string.
 */
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substr(2, length);
}

/**
 * Check if a value is empty.
 * @param val The value to check.
 * @returns True if the value is empty.
 */
export function isEmpty(val: unknown): boolean {
  return (
    val == null ||
    (typeof val === 'string' && val.trim() === '') ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'object' &&
      val !== null &&
      !Array.isArray(val) &&
      Object.keys(val).length === 0)
  );
}

/**
 * Flatten an array deeply.
 * @param arr The array to flatten.
 * @returns A new flattened array.
 */
export function flatten<T>(arr: ReadonlyArray<any>): T[] {
  return arr.reduce<T[]>(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten<T>(toFlatten) : toFlatten),
    []
  );
}

/**
 * Get unique values from array.
 * @param arr Array of values.
 * @returns Array containing only unique values.
 */
export function unique<T>(arr: ReadonlyArray<T>): T[] {
  return [...new Set(arr)];
}

/**
 * Sleep for given milliseconds.
 * @param ms Milliseconds to sleep.
 * @returns Promise that resolves after ms.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chunk an array into groups of size length.
 * @param arr The array to chunk.
 * @param size Size of each chunk.
 * @returns Array of chunked arrays.
 */
export function chunk<T>(arr: ReadonlyArray<T>, size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

/**
 * Interface for object with string keys and any values.
 */
export interface StringKeyedObject {
  readonly [key: string]: any;
}

/**
 * Group array of objects by a key.
 * @param arr Array of objects.
 * @param key The key to group by.
 * @returns An object grouped by the key.
 */
export function groupBy<T extends Record<string, any>>(
  arr: ReadonlyArray<T>,
  key: keyof T
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, obj) => {
    const group = obj[key];
    const groupKey = String(group);
    if (!(groupKey in acc)) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(obj);
    return acc;
  }, {});
}