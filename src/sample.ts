// sample.ts

console.log('This is a sample JS file.');

/**
 * Capitalize first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string | null | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deep clone an object
 * @param obj The object to clone
 * @returns Deeply cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce a function
 * @param fn The function to debounce
 * @param delay Debounce delay in ms
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (...args: Parameters<T>): void {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle a function
 * @param fn The function to throttle
 * @param limit Milliseconds to limit calls
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (...args: Parameters<T>): void {
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
 * Generate a random alphanumeric string
 * @param length Length of string (default: 8)
 * @returns Random string
 */
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substr(2, length);
}

/**
 * Check if a value is empty
 * @param val The value to check
 * @returns True if empty, false otherwise
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
 * Flatten a nested array
 * @param arr The array to flatten
 * @returns Flattened array
 */
export function flatten<T>(arr: readonly any[]): T[] {
  return arr.reduce<T[]>(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten<T>(toFlatten) : toFlatten),
    []
  );
}

/**
 * Get unique values from array
 * @param arr The array to uniquify
 * @returns Array of unique values
 */
export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Sleep for n milliseconds
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after ms
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chunk an array into groups of size n
 * @param arr The array to chunk
 * @param size Size of each chunk
 * @returns An array of chunked arrays
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

/**
 * Group array of objects by a key
 * @param arr Array of objects to group
 * @param key Key of the object to group by
 * @returns Grouped objects by key
 */
export interface Grouped<T> {
  [key: string]: readonly T[];
}

export function groupBy<T extends Record<string, unknown>>(
  arr: readonly T[],
  key: keyof T
): Grouped<T> {
  return arr.reduce<Grouped<T>>((acc, obj) => {
    const group = String(obj[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    (acc[group] as T[]).push(obj);
    return acc;
  }, {});
}