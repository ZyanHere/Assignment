### Find the value inside a deeply nested object

- null || not an object check
- direct check (if keyYouWant is in obj), return obj[keyYouWant]
- for of loop on Object.keys(obj) and do recursion
- store it as a variable
- if this variable is not undefined, return that variable

```js
function findValueByKey(obj, keyToFind) {
  if (obj === null || typeof obj !== 'object') {
    return undefined;
  }

  if (keyToFind in obj) {
    return obj[keyToFind];
  }

  for (const key of Object.keys(obj)) {
    const foundValue = findValueByKey(obj[key], keyToFind);
    if (foundValue !== undefined) {
      return foundValue;
    }
  }

  return undefined;
}

// Example usage
const nestedObject = {
  a: {
    b: {
      c: {
        d: 'Value',
      },
    },
  },
  e: {
    f: 'AnotherValue',
  },
};

console.log(findValueByKey(nestedObject, 'd')); // Returns 'Value'
console.log(findValueByKey(nestedObject, 'f')); // Returns 'AnotherValue'
console.log(findValueByKey(nestedObject, 'g')); // Returns undefined since key does not exist
```

### Example 2, if provided path instead of key
- just split the path and store it as keys variable
- store your obj into another variable (helps in mutation)
- for of loop on keys and each key is used to check if it is undefined, return undefined, else obj = obj[key]
- return obj

```js
function read(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}

// Example usage
const collection = {
  a: {
    b: {
      c: {
        d: {
          e: 2,
        },
      },
    },
  },
};

console.log(read(collection, 'a.b.c.d.e')); // should return 2
console.log(read(collection, 'a.b.c.f')); // should return undefined
```
