## Implement memoization for recursive functions

<strong>Approach Taken:</strong>

1. write a fibonacci function which will be our example for memoization
2. fibonacci using recursion is simple, one condition checks if n<=1 then return n
3. in other scenarios it would return fib(n-1)+fib(n-2)
4. Memoization function requires cache object and a key
5. generate a key based on the number (ex: 12)
6. if cache[key]!==undefined then cache[key]= result and return the result
7. result is fib function which takes args (ex: const result = func(...args))
8. cache[key] = result and return result

```js
const memoize = (func) => {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    return result;
  };
};

// Example: Recursive Fibonacci with memoization
const fib = (n) => {
  // if n = 0 or 1, it will return 0 or 1
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

const memoizedFib = memoize(fib);
console.log(memoizedFib(12)); // Output: 144
console.log(memoizedFib(12)); // Output: 144
```
