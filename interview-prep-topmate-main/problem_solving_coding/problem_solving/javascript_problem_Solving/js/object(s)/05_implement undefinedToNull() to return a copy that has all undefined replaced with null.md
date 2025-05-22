## undefinedToNull

```js
function undefinedToNull(input) {
  // check for primitives, ex: for non object, null
  if (typeof input !== 'object' || input === null) {
    // The nullish coalescing operator returns the right-hand side operand (null in this case) when its left-hand side operand (input) is null or undefined. 
    //If input has any other value, including false, 0, "" (empty string), or any falsy value other than null or undefined, it will return input.
    return input ?? null;
  }

  //core logic is performing for of loop on Object.entries(input)
  for (let [key, value] of Object.entries(input)) {
    if (value === undefined) {
      input[key] = null;
    } else {
      input[key] = undefinedToNull(input[key]);
    }
  }
  return input
}

console.log(undefinedToNull({ a: undefined, b: 'BFE.dev' }));
// {a: null, b: 'BFE.dev'}

console.log(undefinedToNull({ a: ['BFE.dev', undefined, 'bigfrontend.dev'] }));
// {a: ['BFE.dev', null, 'bigfrontend.dev']}
```
