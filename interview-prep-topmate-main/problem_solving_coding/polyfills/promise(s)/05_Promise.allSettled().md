## Promise.allSettled()

**Definition**: takes an iterable of promises as an input and returns a single promise.

- This returned promise fulfills `when all of the input's promises settles`(including when an empty iterable is passed), with an array of objects that describe the outcome of each promise..

```js
//syntax:
Promise.allSettled(iterable);
```

```js
//Example Demo

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo')
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);

// Expected output:
// "fulfilled"
// "rejected"
```

<strong>Approach Taken:</strong>

1. maintain an results final Array to store each promise is fulfilled or rejected with the help of index (ex: while doing forEach)
2. for all settled, the first logic is promises.length === completedCount (ex: did we completed looping through all the elements combining fulfilled and rejected promises)
3. core logic is: perform a forEach on the promises array (you will get a single promise and index)
4. Promise.resolve(promiseItem).then(()=>{}).catch(()=>{}) is the syntax
5. .then has the value as argument, .catch has reason
6. use the index for the following `results[index]= {status: 'fulfilled', value}`
7. and invoke the reusable function which increments the count and also checks for the length
8. if the lengths are matched then `resolve(results)`

```js
function allSettled(promises) {
  // Returns a new promise that resolves when all input promises settle (either fulfilled or rejected)
  return new Promise((resolve) => {
    
    // Array to store results of each promise
    const results = [];
    // Track the count of promises that have settled
    let completedCount = 0;
    // If no promises are passed (empty array), resolve immediately with an empty array
    if (promises.length === 0) {
      resolve([]); // Resolve with empty array and exit early
      return;
    }
    // Helper function to check if all promises have settled
    function checkCompletion() {
      completedCount++;
      // If all promises have settled, resolve with the results array
      if (completedCount === promises.length) {
        resolve(results);
      }
    }
    // Iterate over each promise
    promises.forEach((promise, index) => {
      // Ensure each item is treated as a promise (handles non-promise values)
      Promise.resolve(promise)
        .then((value) => {
          // On fulfillment, store the result as fulfilled with the resolved value
          results[index] = { status: 'fulfilled', value };
          checkCompletion(); // Increment the settled count
        })
        .catch((reason) => {
          // On rejection, store the result as rejected with the reason
          results[index] = { status: 'rejected', reason };
          checkCompletion(); // Increment the settled count
        });
    });
  });
}
// Example usage:
const promise1 = Promise.resolve(42);
const promise2 = Promise.reject('Error occurred');
const promise3 = new Promise((resolve) =>
  setTimeout(resolve, 1000, 'Delayed result')
);
// Call custom allSettled function and log settled results
allSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });
```

---

### Promise.all:

**Functionality:** Waits for `all promises to resolve` or `for any to reject`.
**Use Case:** Ideal when the outcome of all the promises is critical to the proceeding code. If one promise fails, Promise.all rejects immediately with the value of the first promise that rejects, discarding the results of all other promises.
**Return Value:** If all promises resolve, it returns an array of the results of the input promises in the same order. If any promise is rejected, it returns the reason for the first rejection.
**Error Handling:** Not tolerant to any errors. Even if one promise fails, the whole set is considered failed.

---

### Promise.allSettled:

**Functionality:** Waits `until all promises have either resolved or rejected`.
**Use Case:** Useful when you want to know the outcome of each promise regardless of the others. Ideal in scenarios where the completion of each promise is valuable, and you want to handle each promise's result individually.
**Return Value:** Returns an array of objects, each representing the outcome of each promise, with each object having a status key that can be either 'fulfilled' or 'rejected'. If fulfilled, an additional value key contains the resolved value. If rejected, a reason key contains the reason for rejection.
**Error Handling:** Tolerant to errors in individual promises. Allows you to deal with each promise's result independently.
In summary, use Promise.all when the success of every promise is essential, and Promise.allSettled when you need to handle each promise independently, regardless of whether some may fail.
