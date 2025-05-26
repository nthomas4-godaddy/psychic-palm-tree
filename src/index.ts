/***********************
 * TypeScript rewritten *
 ***********************/

let uber: number = 0;

/**
 * Adds two numbers and the global 'uber' variable.
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a, b, and uber
 */
function sum(a: number, b: number): number {
  console.log(a, b);
  return a + b + uber;
}