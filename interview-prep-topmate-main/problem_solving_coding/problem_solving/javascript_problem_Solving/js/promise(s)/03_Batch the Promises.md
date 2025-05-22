## Promises as a batch

**Approach Taken**

1. async function accepts two params, one is fetched url function withe .json conversion
2. second param is a simple batch number (ex: at a time two promises as a batch)
3. maintain a result array and return result post for loop ends
4. for loop runs based on the jsonResponses.length, and the increment happens based on the i=i+batchSize
5. `core logic 1:` slice the batch from the whole set of promises (ex: jsonResponsesPromises.slice(i, i+batchSize)).
6. `core logic 2:` mutate the result = result.concat(await Promise.all(batch.map((task)=>task())))

```js
async function batchProcessPromises(tasks, batchSize) {
  let result = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    console.log('i', i);
    const batch = tasks.slice(i, i + batchSize); // ex: [f, f,f ] sliced to [f, f]
    // mapping over batch sliced functions and calling each function to get the promises they return
    // result at first has the first batch (I mean 2 promises) and then it concatenates with following batch(I mean next 2, but in our case it is 1, so it picks 1 in the 2nd batch), similarly batch.map in this batch is the updated slice function
    result = result.concat(await Promise.all(batch.map((task) => task())));
  }

  //after the concatenated result is returned, this will be moving forward to .then(results) and logs All data fetched
  return result;
}

// Real-time example usage:
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  // ... add more URLs as needed
];

const fetchPromises = urls.map((url) => {
  return () => fetch(url).then((response) => response.json()); // [f, f, f]
});

batchProcessPromises(fetchPromises, 2)
  .then((results) => {
    console.log('All data fetched in batches:', results);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
```
