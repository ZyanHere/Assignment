## Promise.all

**Definition**: takes an `iterable of promises as input` and returns a `single Promise`. This returned promise fulfills `when all of the input's promises fulfill` (including when an empty iterable is passed), with an array of the fulfillment values. `It rejects when any of the input's promises rejects`, with this first rejection reason.

<strong>Approach Taken:</strong>

1. arrayOfPromises is passed as a param and do a forEach (ex: promisesArr.forEach(promise))
2. forEach promise do Promise.resolve(promise) and then do the following .then and .catch
3. as Promise.all fulfills if all are fulfilled promise values, so we have to maintain an dummyArray (ex: results) and for each iteration dummyArray[index]= callbackValue (ex: results[index] = value) inside the .then block
4. also maintain a resolvedCount 
5. so when resolvedCount.length is equal to the passed promisesArray.length then resolve(results) with Aggregate Error saying that all the promises are rejected.

```js
function all(promises) {
  // Returns a new promise that resolves when all input promises resolve, 
  // or rejects if any promise rejects
  return new Promise((resolve, reject) => {
    
    if (!Array.isArray(promises)) {
      // If input is not Array, reject with an error
      return reject(new TypeError('The input should be an array'));
    }
    // Track the count of resolved promises
    let resolvedCount = 0;
    // Array to store results from each promise
    const results = new Array(promises.length);
    // If no promises are passed (empty array), resolve immediately with an empty array
    if (promises.length === 0) {
      return resolve(results); // Resolve with empty array and exit early
    }
    // Iterate over each promise
    promises.forEach((promise, index) => {
      // Ensure each item is treated as a promise (handles non-promise values)
      Promise.resolve(promise)
        .then((value) => {
          // Increment resolved count and store the resolved value
          resolvedCount++;
          results[index] = value;
          // If all promises have resolved, resolve with results array
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          // If any promise rejects, reject the entire all promise
          reject(error);
        });
    });
  });
}
// Usage example with three promises that resolve to numbers
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
// Call custom all function and log resolved values or catch any error
all([p1, p2, p3])
  .then((values) => console.log(values)) // Logs: [1, 2, 3]
  .catch((error) => console.error(error));
// Example 2: Using an empty array of promises
const urls = []; // Empty array, meaning no promises to handle
all(urls.map((url) => fetch(url)))
  .then((results) => console.log(results)) // Logs an empty array []
  .catch((error) => console.error(error));
```
