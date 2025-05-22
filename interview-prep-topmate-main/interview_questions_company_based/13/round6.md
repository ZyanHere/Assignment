## 1. write a memoize function to remember the value for same input sum(10,20)--return 30 next time if i call again it should return 30

```js
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args.toString(); // Convert arguments array to a string key
    if (cache.hasOwnProperty(key)) {
      console.log('Fetching from cache');
      return cache[key];
    } else {
      console.log('Calculating result');
      const result = fn.apply(this, args);
      cache[key] = result;
      return result;
    }
  };
}

// Function to sum any number of arguments
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

// Create a memoized version of sum
const memoizedSum = memoize(sum);

console.log(memoizedSum(10, 20)); // Calculating result and returns 30
console.log(memoizedSum(10, 20)); // Fetching from cache and returns 30
// You can now call memoizedSum with any number of arguments
console.log(memoizedSum(1, 2, 3, 4, 5, 6)); // Calculating result and returns 21
console.log(memoizedSum(1, 2, 3, 4, 5, 6)); // Fetching from cache and returns 21
```

---

## 2. write a delayed function in js to execute after some time

```js
function delayedFunction(callback, delay) {
  setTimeout(callback, delay);
}

// Example usage:
delayedFunction(() => {
  console.log('This message will be delayed by 2 seconds.');
}, 2000);
```
----

## 3. Output Based question

- This is because when you perform a.reverse() it mutates the array 'a' and we are storing this as part of variable 'c', so that is the reason we see both have same values.

```js
let a = [1, 2, 3, 4];
let c = a.reverse(); 
console.log('c', c) // [4,3,2,1]
console.log('before slice "a"', a); // [4,3,2,1]
c.push(a.slice(0,2))
console.log('after slice "a"', a) // [4,3,2,1,[4,3]]
console.log('new C', c) // [4,3,2,1,[4,3]]
console.log(a.length); //5
```

- if you don't want this behavior then just make some tweaks to it

```js
let a = [1, 2, 3, 4];
let c = [...a].reverse(); // Make a copy of 'a' and reverse the copy
console.log('c', c); // [4, 3, 2, 1]
console.log('before slice "a"', a); // [1, 2, 3, 4]
c.push(...a.slice(0, 2)); // Use spread operator to push elements instead of the array slice itself
console.log('after slice "a"', a); // [1, 2, 3, 4]
console.log('new C', c); // [4, 3, 2, 1, 1, 2]
console.log(a.length); // 4
```

-----

 