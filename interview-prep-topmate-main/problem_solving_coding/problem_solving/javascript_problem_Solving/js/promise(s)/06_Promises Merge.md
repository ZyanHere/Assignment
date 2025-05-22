### Promises Merge

- in params, you will pass Promise.resolve(value1), Promise.resolve(value2)...
- you simply accept input as ...rest operator (ex: ...promises)
- if promises.length ===0, new TypeError
- return Promise.all(promisesArray).then((results)), this results is nothing but values (ex: 1 or 2 or [1,2,3])
- typeof firstValue (ex: typeof results[0])
- initialize the return variable (ex: accumulator) - Remember this
- check firstType with all data types (Number, String, Boolean, Array.isArray, object) and mutate the accumulator according to that
- for of loop on results array which has two core logics
- core logic 1: if(typeof result!==firstType) then return TypeError('inconsistent')
- core logic 2: if firstType is of (any data type, then mutate accumulator according to that)

---

### Reusability Code Example

```js
function accumulateNumbers(results) {
  return results.reduce((acc, curr) => acc + curr, 0);
}

function concatenateStrings(results) {
  return results.join('');
}

function combineBooleans(results) {
  return results.every(Boolean);
}

function concatenateArrays(results) {
  return results.flat();
}

function mergeObjects(results) {
  return Object.assign({}, ...results);
  //return results.reduce((acc, obj) => ({ ...acc, ...obj }), {}); (YOU CAN ALSO USE THIS PIECE OF CODE)
}

function validateTypes(results) {
  const firstType = typeof results[0];
  const allSameType = results.every((result) => typeof result === firstType);

  if (!allSameType) {
    throw new TypeError('Inconsistent types of promises');
  }

  return firstType;
}

async function promiseMerge(...promises) {
  if (promises.length === 0) {
    throw new TypeError('No promises provided');
  }

  const results = await Promise.all(promises);

  if (results.length === 0) {
    throw new TypeError('No values resolved from promises');
  }

  const firstType = validateTypes(results);

  switch (firstType) {
    case 'number':
      return accumulateNumbers(results);
    case 'string':
      return concatenateStrings(results);
    case 'boolean':
      return combineBooleans(results);
    case 'object':
      return Array.isArray(results[0])
        ? concatenateArrays(results)
        : mergeObjects(results);
    default:
      throw new TypeError('Invalid or unsupported data type');
  }
}

// Usage remains the same

async function testPromiseMerge() {
  try {
    // Test with numbers
    const sum = await promiseMerge(Promise.resolve(1), Promise.resolve(2));
    console.log(sum); // Output: 3

    // Test with strings
    const concatenatedString = await promiseMerge(
      Promise.resolve('devtools'),
      Promise.resolve('.tech')
    );
    console.log(concatenatedString); // Output: devtools.tech

    // Test with arrays
    const concatenatedArray = await promiseMerge(
      Promise.resolve([1, 2, 3]),
      Promise.resolve([4, 5, 6]),
      Promise.resolve([7, 8, 9])
    );
    console.log(concatenatedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Test with objects
    const mergedObject = await promiseMerge(
      Promise.resolve({ a: 1 }),
      Promise.resolve({ b: 2 }),
      Promise.resolve({ c: 3 })
    );
    console.log(mergedObject); // Output: { a: 1, b: 2, c: 3 }

    // Test with booleans
    const booleanResult = await promiseMerge(
      Promise.resolve(true),
      Promise.resolve(false)
    );
    console.log(booleanResult); // Output: false

    // Test with mixed types (should throw TypeError)
    // await promiseMerge(Promise.resolve('devtools'), Promise.resolve(1));

    await promiseMerge(Promise.resolve('devtools'), Promise.resolve([1, 2]));
    // => rejects with TypeError
  } catch (error) {
    console.error(error);
  }
}

testPromiseMerge();
```
