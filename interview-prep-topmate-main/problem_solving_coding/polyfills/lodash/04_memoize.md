### memoize

```js
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(this, args);
    }
    return cache[key];
  };
}

// Fibonacci function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version of the Fibonacci function
const memoizedFibonacci = memoize(fibonacci);

// Example usage
const fib10 = memoizedFibonacci(10); // Efficiently calculates the 10th Fibonacci number
const fib20 = memoizedFibonacci(20); // Efficiently calculates the 20th Fibonacci number

// Output results to the console
console.log(`Fibonacci of 10: ${fib10}`);
console.log(`Fibonacci of 20: ${fib20}`);
```