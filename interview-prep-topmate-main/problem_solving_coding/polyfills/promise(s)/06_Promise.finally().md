## Promise.finally()

**Definition**: schedules a function to be called when the promise is settled (rejected/fulfilled).

```js
//Example
`Promise.prototype.finally()` could be used to run a callback when a promise is settled(either fulfilled or rejected).

Notice that the callback passed finally() does not receive any argument, meaning it does not modify the value in the promise chain (care for rejection).
```

```js
//syntax:
promiseInstance.finally(onFinally);
```

<strong>Approach Taken:</strong>

`core logic 1:` store Promise constructor as a variable (ex: const P = this.constructor)
`core logic 2:` return this.then((value)=>P.resolve(), (reason)=>P.resolve())
`continuation` inside the P.resolve, put the callback (ex: P.resolve(callback)) and add .then(()=>value) or .then(()=>{throw reason})

```js
if (typeof Promise !== 'undefined' && !Promise.prototype.customFinally) {
  Promise.prototype.customFinally = function (callback) {
    const P = this.constructor; // Get the Promise constructor

    // We don’t invoke the callback in here, we just make sure to propagate
    // the value of the original Promise once it's resolved
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (reason) =>
        P.resolve(callback()).then(() => {
          throw reason;
        })
    );
  };
}

// Test cases
const successPromise = Promise.resolve('Success!');
const failPromise = Promise.reject('Failure!');

successPromise
  .then((value) => console.log(value))
  .catch((err) => console.log('Error:', err))
  .customFinally(() => console.log('Final callback for successPromise'));

failPromise
  .then((value) => console.log(value))
  .catch((err) => console.log('Error:', err))
  .customFinally(() => console.log('Final callback for failPromise'));
```

```js
//Output:
Success!
Error: Failure!
Final callback for successPromise
Final callback for failPromise
```
