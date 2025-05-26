// sample.ts
console.log('This is a sample JS file.');

/**
 * Capitalize first letter
 * @param str The input string
 * @returns The string with the first letter capitalized
 */
export function capitalize(str: string | null | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deep clone an object using structured cloning.
 * @param obj Object to clone
 * @returns The cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce function
 * @param fn Function to debounce
 * @param delay Number of milliseconds to delay
 * @returns Debounced function
 */
export function debounce<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number
): (...args: TArgs) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: TArgs): void {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function
 * @param fn Function to throttle
 * @param limit Interval in milliseconds to limit
 * @returns Throttled function
 */
export function throttle<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => void,
  limit: number
): (...args: TArgs) => void {
  let inThrottle = false;
  return function (this: unknown, ...args: TArgs): void {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random string
 * @param length Length of the random string (default: 8)
 * @returns Random string
 */
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substr(2, length);
}

/**
 * Check if value is empty
 * @param val The value to check
 * @returns True if value is empty
 */
export function isEmpty(val: unknown): boolean {
  return (
    val == null ||
    (typeof val === 'string' && val.trim() === '') ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'object' && val !== null && Object.keys(val).length === 0)
  );
}

/**
 * Flatten array of arbitrary depth
 * @param arr The array to flatten
 * @returns Flattened array
 */
export function flatten<T>(arr: readonly unknown[]): T[] {
  return arr.reduce<T[]>(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten<T>(toFlatten) : (toFlatten as T)),
    []
  );
}

/**
 * Get unique values from array
 * @param arr Input array
 * @returns Array of unique values
 */
export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Sleep
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after ms
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chunk array
 * @param arr Input array
 * @param size Chunk size
 * @returns Array chunked into arrays of given size
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

/**
 * Group by key
 * @param arr Array of objects
 * @param key Key to group by
 * @returns Object with grouped arrays by key
 */
export interface AnyObject {
  [key: string]: unknown;
}

/**
 * Type for groupBy return value
 */
export type GroupByResult<T> = {
  readonly [key: string]: T[];
};

/**
 * Group array by object key
 * @param arr Array of objects to group
 * @param key Key to group by (must be keyof T & string)
 * @returns Object of grouped arrays by key
 */
export function groupBy<T extends Record<string, any>, K extends keyof T & string>(
  arr: readonly T[],
  key: K
): GroupByResult<T> {
  return arr.reduce<GroupByResult<T>>((acc, obj) => {
    const group = obj[key];
    const groupKey = String(group);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(obj);
    return acc;
  }, {});
}