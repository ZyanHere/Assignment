### Promise.pool

- Useful in scenarios involving concurrent async operations
- Rate limiting with External API's (Ex: If your app needs to make numerous API calls using a promise pool can help you to stay within these rate limits by controlling how many requests made concurrently)
- By limiting concurrent operations, you can prevent resource exhaustion (which is crucial for maintaining the stability and performance of your application)

**_Promise Pool:_** is used to control the number of concurrent asynchronous operations (like API calls, file processing, etc.) that are executed at the same time.

**_Promise Time Limit:_**: involves setting a timeout for a promise, meaning that the promise must either resolve or reject within a certain time frame.

- Used to avoid situations where a promise might never resolve (or take an unacceptably long time to do so).

```js
function promisePool(limit, tasks) {
  // limit means the maximum no. of concurrent tasks
  // task means an array of functions that return promises.
  let inProgress = 0;
  let index = 0;
  let results = [];

  return new Promise((resolve, reject) => {
    while (inProgress < limit && index < tasks.length) {
      runTask(index++);
    }

    //used to manage each task. When a task completes it checks if there are more tasks to run and starts the next one. Also keeps track of inProgress tasks
    function runTask(taskIndex) {
      inProgress++;
      tasks[taskIndex]()
        .then((result) => {
          results[taskIndex] = result;
          inProgress--;
          if (index < tasks.length) {
            runTask(index++);
          }
          // once all tasks are completed, the promise is resolved
          else if (inProgress === 0) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

// example of an asynchronous operation
function simulateAsyncTask(id, delay) {
  console.log(`Task ${id} started`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} "COMPLETED"`);
      resolve(`Result of task ${id}`);
    }, delay);
  });
}

// Example usage
let tasks = [
  () => simulateAsyncTask(1, 2000), // Task 1 will take 2 seconds
  () => simulateAsyncTask(2, 1000), // Task 2 will take 1 second
  () => simulateAsyncTask(3, 3000), // Task 3 will take 3 seconds
  () => simulateAsyncTask(4, 500), // Task 4 will take 0.5 seconds
  // ... more tasks
];

promisePool(2, tasks) // Set concurrency limit to 2
  .then((results) => console.log('All tasks completed:', results))
  .catch((error) => console.error('An error occurred:', error));
```
