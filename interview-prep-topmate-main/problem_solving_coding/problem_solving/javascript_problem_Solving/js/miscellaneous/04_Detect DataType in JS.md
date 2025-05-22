**Approach Taken**:

1. new Map takes an array of arrays
2. for 50% of the dataTypes, we just need to do `return typeof param`, so for this the first condition should be if(typeof param !=='object') then return typeof param
3. else check for 2 things, one is null and second is performed using for of loop
4. ex: for([type, name] of maintainedArrayOfArrays), if param is instance of type return name
5. post for loop return object

```js
let mapTypeToName = new Map([
  [Map, 'map'],
  [Array, 'array'],
  [Set, 'set'],
  [Date, 'date'],
  [Function, 'function'],
  [Number, 'number'],
  [String, 'string'],
  [Boolean, 'boolean'],
]);

function detectType(data) {
  if (typeof data !== 'object') {
    return typeof data;
  } else {
    if (data === null) return 'null';
    for ([type, name] of mapTypeToName) {
      if (data instanceof type) return name;
    }
    return 'object';
  }
}

console.log(detectType(1)); // 'number'
console.log(detectType(new Map())); // 'map'
console.log(detectType([])); // 'array'
console.log(detectType(null)); // 'null'
console.log(detectType('')); // 'string'
console.log(detectType()); // 'undefined'
console.log(detectType(() => {})); // 'function'
console.log(detectType(new Set())); // 'set'
console.log(detectType(new Date())); // 'date'
console.log(detectType(true)); // 'boolean'
console.log(detectType({})); // 'boolean'
```
