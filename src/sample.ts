// sample.ts
console.log('This is a sample JS file.');

/**
 * Capitalizes the first letter of the given string.
 * @param str - The input string.
 * @returns The capitalized string.
 */
export function capitalize(str: string | null | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Performs a deep clone of an object.
 * @param obj - The object to clone.
 * @returns The cloned object.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Creates a debounced function that delays invoking fn until after delay ms.
 * @param fn - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced function.
 */
export function debounce<F extends (...args: readonly unknown[]) => void>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeout: number | undefined;
  return function (this: unknown, ...args: Parameters<F>): void {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = window.setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Creates a throttled function that only invokes fn at most once per limit ms.
 * @param fn - The function to throttle.
 * @param limit - The throttle limit in milliseconds.
 * @returns The throttled function.
 */
export function throttle<F extends (...args: readonly unknown[]) => void>(
  fn: F,
  limit: number
): (...args: Parameters<F>) => void {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<F>): void {
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
 * Generates a random string of the given length.
 * @param length - The desired string length.
 * @returns The random string.
 */
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substr(2, length);
}

/**
 * Checks if a value is empty.
 * @param val - The value to check.
 * @returns True if value is empty, else false.
 */
export function isEmpty(val: unknown): boolean {
  return (
    val == null ||
    (typeof val === 'string' && val.trim() === '') ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'object' &&
      val !== null &&
      !Array.isArray(val) &&
      Object.keys(val as Record<string, unknown>).length === 0)
  );
}

/**
 * Flattens a nested array.
 * @param arr - The array to flatten.
 * @returns The flattened array.
 */
export function flatten<T>(arr: readonly (T | T[])[]): T[] {
  return arr.reduce<T[]>(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten as T),
    []
  );
}

/**
 * Returns unique values from an array.
 * @param arr - The array of values.
 * @returns The array with unique values.
 */
export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Sleeps for the given milliseconds.
 * @param ms - Milliseconds to sleep.
 * @returns A promise resolved after ms.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chunks an array into smaller arrays of the given size.
 * @param arr - The array to chunk.
 * @param size - The size of each chunk.
 * @returns The array of chunks.
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

/**
 * Groups an array of objects by a key.
 * @param arr - Array of objects to group.
 * @param key - Key to group by.
 * @returns An object grouped by the key.
 */
export interface IndexedObject {
  readonly [key: string]: unknown;
}

export function groupBy<T extends IndexedObject>(
  arr: readonly T[],
  key: keyof T
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, obj) => {
    const group = obj[key];
    const groupKey = String(group);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(obj);
    return acc;
  }, {});
}