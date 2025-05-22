### Promises in sequence execution

```js
//takes an array of functions that return promises.
// if you pass array of promises directly, they will start executing immediately.
// By using functions that return promises, you ensure that each promise starts executing only when its turn comes
function executePromisesInSequence(promiseArray) {
  let secondsElapsed = 0;
  const timer = setInterval(() => {
    secondsElapsed++;
    console.log(`${secondsElapsed} second(s) elapsed`);
  }, 1000);

  //acc is promiseChain which is initially a resolved promise, with each iteration it chains the next promise
  return promiseArray
    .reduce((promiseChain, currentPromise) => {
      //each promise in the array is executed in sequence, and the results are accumulated in an array
      return promiseChain.then((chainResults) =>
        currentPromise().then((currentResult) => [
          ...chainResults,
          currentResult,
        ])
      );
    }, Promise.resolve([]))
    .then((result) => {
      clearInterval(timer); // Clear the timer after all promises have been resolved
      return result;
    });
}

// Example usage
const createPromise = (value, delay) => () =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

// Array of promises
const promises = [
  createPromise('Promise 1', 1000),
  createPromise('Promise 2', 2000),
  createPromise('Promise 3', 3000),
];

executePromisesInSequence(promises).then(console.log); // Logs each resolved value in sequence (this is resolved when all the promises have been executed)


// Output:
1 second(s) elapsed
2 second(s) elapsed
3 second(s) elapsed
4 second(s) elapsed
5 second(s) elapsed
[ 'Promise 1', 'Promise 2', 'Promise 3' ]
```
