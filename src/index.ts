/****
 * Global variable storing the uber value
 */
let uber: number = 0;

/**
 * Sums two numbers and adds the global uber variable.
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of a, b, and uber
 */
function sum(a: number, b: number): number {
  console.log(a, b);
  return a + b + uber;
}