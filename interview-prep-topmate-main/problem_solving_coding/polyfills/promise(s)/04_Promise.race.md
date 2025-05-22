## Promise.race()

**Definition**: takes an iterable of promises and returns the first resolved/rejected (returns a single promise)

```js
//syntax:
Promise.race(iterable);
```

<strong>Approach Taken:</strong>

1. promise.customRace is a function that takes array of promises (param)
2. this function return new Promise(resolve, reject) and then start writing the logic as follows
3. write a for of loop ex: for(let singlePromiseItem of promisesArray)
4. Promise.resolve(singlePromiseItem).then(resolve, reject)

```js
if (typeof Promise.customRace !== 'function') {
  Promise.customRace = function (promises) {
    return new Promise((resolve, reject) => {
      // Ensure the input is iterable
      if (!Array.isArray(promises)) {
        throw new TypeError(
          'The arguments to Promise.customRace must be an iterable'
        );
      }

      // Resolve or reject the main promise as soon as one of the input promises settles
      for (let p of promises) {
        Promise.resolve(p).then(resolve, reject);
      }
    });
  };
}

// Example Usage
function delay(message, time) {
  return new Promise((resolve) => setTimeout(() => resolve(message), time));
}

Promise.customRace([
  delay("Delay 1 second", 1000),
  delay("Delay half a second", 500)
])
.then(result => console.log(result))  // Outputs: "Delay half a second"
.catch(error => console.error(error));
```
