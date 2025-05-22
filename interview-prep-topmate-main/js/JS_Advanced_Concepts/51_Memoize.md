#### Definition:

- An optimization technique used primarily to speed up computer programs by storing the results of an expensive function calls and returning the cached result when the same inputs occur again


### Example 1
```js
// if this cache object declaration happens inside add function, then for every new add function invocation it creates a new cache and everything results as non-cached
const cache = {}
function add(num) {
  if (cache[num]) {
    console.log('cached value', num)
    return cache[num]
  } else {
    console.log('non-cached value', num)
    cache[num] = num
    return cache[num]
  }
}

add(20) //non-cached value 20
add(20) //cached value 20
add(20) //cached value 20
add(20) //cached value 20
```

---

### Example 2

```js
//fibonacci using cache

function fibonacci(n, cache = {}) {
  if (cache[n]) return cache[n]
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1
  return (cache[n] = fibonacci(n - 2) + fibonacci(n - 1))
}
console.log(fibonacci(10)) //55
```

---

### Example 3

```js
function add(a, b) {
  return a + b
}

function getUniqueId(fn, args) {
  let uniqueId = []
  uniqueId = uniqueId.concat(fn.name, args)
  return uniqueId.join('|')
}

function memoize(fn) {
  let cache = {}
  return function (...args) {
    let uniqueId = getUniqueId(fn, args)
    if (cache[uniqueId]) {
      console.log('from cache', cache)
      return cache[uniqueId]
    } else {
      cache[uniqueId] = fn(...args)
      console.log('not from cache', cache)
      return cache[uniqueId]
    }
  }
}
const memoizeAdd = memoize(add)
memoizeAdd(10, 20) //not from cache {add|10|20: 30}
memoizeAdd(10, 20) //from cache {add|10|20: 30}
memoizeAdd(10, 20) //from cache {add|10|20: 30}
```

----

### Example 4


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
----
