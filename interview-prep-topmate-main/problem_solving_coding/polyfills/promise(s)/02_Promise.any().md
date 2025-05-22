## Implement Promise.any polyfill

**Definition**: takes an `iterable of promises` as input and `returns a single Promise`. This returned promise fulfills when `any of the input's promises fulfills`, with this first fulfillment value. It rejects `when all of the input's promises reject` (including when an empty iterable is passed)

```js
//Syntax
Promise.any(iterable);
```

<strong>Approach Taken:</strong>

1. arrayOfPromises is passed as a param and do a forEach (ex: promisesArr.forEach(promise))
2. forEach promise do Promise.resolve(promise) and then do the following .then and .catch
3. as Promise.any rejects if all are rejected promise values, so we have to maintain an errorsArray (ex: errors.push(error)) inside the catch block
4. so when errors.length is equal to the passed promisesArray.length then return reject with Aggregate Error saying that all the promises are rejected.

```js
function any(promises) {
  // Returns a new promise that resolves or rejects based on the first settled result
  return new Promise((resolve, reject) => {
    // Flag to indicate if any promise has been fulfilled
    let isFulfilled = false;
    // Array to store errors from each rejected promise
    const errors = [];
    // Counter to track the number of rejected promises
    let errorCount = 0;
    // Iterate over each promise in the array
    promises.forEach((promise, index) =>
      promise.then(
        (data) => {
          // If a promise fulfills and no other promise has fulfilled yet
          if (!isFulfilled) {
            // Resolve the outer promise with the fulfillment value
            resolve(data);
            // Set the flag to prevent further resolutions
            isFulfilled = true;
          }
        },
        (error) => {
          // If the promise is rejected, store the error at the given index
          errors[index] = error;
          // Increment the count of rejected promises
          errorCount += 1;
          // If all promises are rejected, reject the outer promise with an AggregateError
          if (errorCount === promises.length) {
            reject(new AggregateError('none resolved', errors));
          }
        }
      )
    );
  });
}
// Usage examples
const p1 = Promise.reject('Failed 1');
const p2 = Promise.resolve('Succeed 2');
const p3 = Promise.reject('Failed 3');
any([p1, p2, p3])
  .then((value) => console.log(value)) // Logs: 'Succeed 2'
  .catch((error) => console.error(error));
// Example 2: Includes a plain value in the promises array
const promise1 = Promise.reject('Failed 1');
const promise2 = 'Succeeded'; // A plain value that is treated as a fulfilled promise
const promise3 = Promise.reject('Failed 3');
any([promise1, promise2, promise3])
  .then((value) => console.log(value)) // Logs: 'Succeeded'
  .catch((error) => console.error(error));
// Example 3: All promises rejected, should return an AggregateError
const promiseA = Promise.reject('Failed A');
const promiseB = Promise.reject('Failed B');
const promiseC = Promise.reject('Failed C');
any([promiseA, promiseB, promiseC])
  .then((value) => console.log(value))
  .catch((error) => {
    console.error(error); // Logs: AggregateError with individual rejection reasons
  });
```
