**Approach Taken**
1. Write 2 functions, one func is fetchDataFromAPI and another is the main function which takes your resulted apiFunc with timeout
2. Your main function core logic is to save the timeout in a variable (ex: let timeout = new Promise((resolve, reject)=>{setTimeoutLogic here})
3. stored timeout variable is going to be as part of the return Promise.race[promiseParam, timeoutVariable]

```js
// takes a promise and timeout duration in ms.
function promiseWithTimeout(promise, ms) {
  //creates a new Promise that rejects after the specified timeout duration
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject('Timed out in ' + ms + 'ms.'); //core logic is to reject
    }, ms);
  });

  // Promise.race is used to race this timeout promise against the original promise
  return Promise.race([promise, timeout]);
}

// BASIC API CALL Func which is wrapped in setTimeout
function fetchDataFromAPI(url, delay = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Artificial delay
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            reject(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => resolve(json))
        .catch((error) => {
          console.error('Fetching data failed:', error);
          reject(error); // Re-throw the error for further handling if necessary
        });
    }, delay);
  });
}

// Usage example with an intentional delay
let delay = 2000; // Delay of 2000ms
let timeout = 3000; // Timeout of 1000ms (MUTATE THIS VALUE TO SHOW TO INTERVIEWER e.g. 1000 to 2300)
let someAsyncOperation = fetchDataFromAPI(
  'https://jsonplaceholder.typicode.com/todos',
  delay
);

promiseWithTimeout(someAsyncOperation, timeout)
  .then((response) => console.log('Success:', response))
  .catch((error) => console.error('Error:', error));
```
