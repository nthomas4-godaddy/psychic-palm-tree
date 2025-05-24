// sample.ts
console.log('This is a sample JS file.');

/**
 * Capitalize the first letter of the string.
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string | null | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deep clone an object.
 * @param obj - The object to clone
 * @returns A deep cloned copy of the object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce a function.
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns A debounced function
 */
export function debounce<F extends (...args: readonly any[]) => void>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args: Parameters<F>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle a function.
 * @param fn - Function to throttle
 * @param limit - Limit in milliseconds
 * @returns A throttled function
 */
export function throttle<F extends (...args: readonly any[]) => void>(
  fn: F,
  limit: number
): (...args: Parameters<F>) => void {
  let inThrottle = false;
  return function (...args: Parameters<F>): void {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random string.
 * @param length - Length of the string (default 8)
 * @returns Randomly generated string
 */
export function randomString(length: number = 8): string {
  return Math.random().toString(36).substr(2, length);
}

/**
 * Check if a value is empty.
 * @param val - Value to check
 * @returns True if empty, else false
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
 * Flatten an array recursively.
 * @param arr - Array to flatten
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
 * Get unique values from array.
 * @param arr - Array of values
 * @returns Array with unique values
 */
export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Sleep for a specified time.
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after ms
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chunk an array into smaller arrays.
 * @param arr - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

/**
 * Group array of objects by a key.
 * @param arr - Array of objects
 * @param key - Key to group by
 * @returns Object grouping the arrays by key value
 */
export function groupBy<T extends Record<string, any>, K extends keyof T>(
  arr: readonly T[],
  key: K
): Record<string, readonly T[]> {
  return arr.reduce<Record<string, T[]>>((acc, obj) => {
    const group = String(obj[key]);
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    return acc;
  }, {});
}