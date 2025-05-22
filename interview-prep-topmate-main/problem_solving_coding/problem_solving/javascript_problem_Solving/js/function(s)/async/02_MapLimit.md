- **inputs:** array of inputs
- **limit**: the max number of operations at any given time,
- The **_limit parameter_** in the mapLimit function **_serves to control the <u>maximum number of asynchronous operations that are allowed</u> to run in parallel_**. Even though the limit is set to 2, the function eventually processes all items in the inputs array. However, it only processes up to 2 items at a time.
- **iterateeFn**, The async function that should be called with each input to generate the corresponding output.
- **finalCallback**, function that should be called with the array of outputs once all inputs have been processed.

#### Working Mechanism:

- When mapLimit is called, it starts processing the items in `inputs`
- It begins by launching the async operations for the first two items (due to limit is 2). So, getUserById is called for `1` and `2`
- As each of these operations completes, the `mapLimit` function launches the next operation for the next item in the array by ensuring not more than 2 operations are running at the same time.
- Ex: When the operation for `1` completes, it starts the operation for `3` and when the operation for `2` completes, it starts the operation for `4` and so on.
- Even though the operations are limited to 2 concurrent tasks at a time, the function still processes all items in the `inputs` array.
- The output includes results for each item in the `inputs` array **_but these operations are not all performed simultaneously. They are queued and executed based on the specified limit_**.

```js
// This is useful for managing resource usage when performing a large number of asynchronous operations, such as database requests.
function mapLimit(inputArr, limit, iterateeFn, callback) {
  let inProgress = 0;
  let index = 0;
  let results = [];
  function processNext() {
    if (index === inputArr.length && inProgress === 0) {
      callback(results);
      return;
    }

    while (index < inputArr.length && inProgress < limit) {
      (function (i) {
        inProgress++;
        iterateeFn(inputArr[i], function (result) {
          results[i] = result;
          inProgress--;
          processNext();
        });
      })(index);
      index++;
    }
  }

  processNext();
}

function getUserById(id, callback) {
  const randomRequestTime = Math.floor(Math.random() * 100) + 2000;
  console.log(`Starting operation for User ${id}`);
  setTimeout(() => {
    console.log(`Completing operation for User ${id}`);
    console.log('-----------------------------------------');
    callback(`User ${id}`);
  }, randomRequestTime);
}

mapLimit([1, 2, 3, 4], 2, getUserById, (results) => {
  console.log(results);
});
```

<img src="./imagesUsed/mapLimit.png">