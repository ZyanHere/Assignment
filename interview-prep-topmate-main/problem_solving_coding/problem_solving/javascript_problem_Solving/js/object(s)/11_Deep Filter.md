### Deep Filter with result as object

```js
//input is the object, callback is based on how you want to filter the element (ex: element > 0)
function filter(input, callback) {
  const result = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== null && typeof value === 'object') {
      const filteredObject = filter(value, callback);

      // is crucial for ensuring that only `non-empty objects` are added to the result object.
      Object.keys(filteredObject).length > 0 && (result[key] = filteredObject);
    } else if (callback(value)) {
      result[key] = value;
    }
  }

  return result;
}

// Example usage
const input1 = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

const callback1 = (element) => element >= 0;
const filtered1 = filter(input1, callback1);
console.log(filtered1); // { a: 1, b: { c: 2, h: { i: 5, j: 6 } } }

const input2 = {
  a: 1,
  b: {
    c: 'Hello World',
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: 'Good Night Moon',
  },
};

const callback2 = (element) => typeof element === 'string';
const filtered2 = filter(input2, callback2);
console.log(filtered2); // { b: { c: 'Hello World', h: 'Good Night Moon' } }
```
