## Deepest value in the object using a string

**Approach Taken**

1. a.b.c is provided as argument, so simply do the split('.').reduce
2. accumulator is your object, currentValue is the iteration values
3. So simply accumulator[currentValue] ! == undefined then return the same else null

```js
const deepValueInObj = (obj, path) => {
  return path
    .split('.')
    .reduce(
      (accumulator, currentValue) =>
        accumulator && accumulator[currentValue] !== undefined
          ? accumulator[currentValue]
          : null,
      obj
    );
};
// Example usage:
const obj = {
  a: {
    b: {
      c: 42,
    },
  },
};

console.log(deepValueInObj(obj, 'a.b.c')); // Output: 42
console.log(deepValueInObj(obj, 'a.b.x')); // Output: null
```
