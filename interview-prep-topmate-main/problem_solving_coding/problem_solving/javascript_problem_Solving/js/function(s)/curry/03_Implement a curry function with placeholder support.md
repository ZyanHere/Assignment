## Curry Function with placeholder support

**Approach Taken:**
1. curry function (parent) is having curried function (child)
2. curry function (parent) accepts **`join`** function, curried function (child) accepts **`args`** (ex: your function invocation arguments, I mean (1,2,3))
3. if/else conditions
4. **`if`** is for to check **`args.length >= fn.length`** (fn.length is **`three`** because **`join`** accepts a,b,c) && args should **not** have placeholder in it, then only **`return fn(...args)`**, **`fn`** means **`join`** in our case
5. **`else`** return a function to accept the **`newArgs`**, newArgs are the ones which are passed in the later stage(I mean second invocation and then followed by third invocation).
6. **core logic** is <ins>**map the args**</ins> and check if any arg is having placeholder, if yes **`newArgs.shift()`**, else **`arg`**, this result is now concatenated with newArgs again, which is stored in combinedArgs variable
7. return curried(...combinedArgs)

```js
// curry function implementation
// fn means function join which has (a, b, c) as arguments, so fn.length is 3
const curry = (fn) => {
  //args means curriedJoin arguments which is [1,2,3] for the first invocation
  const curried = (...args) => {
    // Check if the number of provided arguments matches the original function's length
    // ex: 3 >=3 && [1,2,3].slice(0,3)
    const hasEnoughArgs = args.length >= fn.length;

    // Check if all necessary arguments (excluding placeholders) are provided
    const hasNoPlaceholders = args
      .slice(0, fn.length)
      .every((arg) => arg !== curry.placeholder);

    // so above if condition is passed as no arg has placeholder
    if (hasEnoughArgs && hasNoPlaceholders) {
      // If yes, call the original function with the provided arguments
      // ex: invoke the join function with all the arguments we got
      // (ex: a=1, b=2, c=3)
      return fn(...args);
    } else {
      // Otherwise, return a function to accept the remaining arguments
      return (...newArgs) => {
        // Merge the old arguments and new arguments, considering placeholders
        const combinedArgs = args
          .map((arg) =>
            arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg
          )
          .concat(newArgs);
        return curried(...combinedArgs);
      };
    }
  };
  return curried;
};

//outside the function
curry.placeholder = Symbol();

// Example function
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
const _ = curry.placeholder;

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
```
