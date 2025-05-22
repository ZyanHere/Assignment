### Make a function that only calls input function f every 2000 milliseconds

**_Approach Taken:_**

- maintain a timerId variable
- return another function with set of args
- in that another function write the below logic
- if(timerId) then return nothing (ex: return)
- mutate the timerId = setTimeout(()=>{
  f.apply(this,args)
  timerId = null

}, intervalParam)

```js
function throttle(f, interval) {
  let timerId = null;

  return function (...args) {
    if (timerId) return; // If timer is already set, do nothing

    timerId = setTimeout(() => {
      f.apply(this, args); // Call the function after the interval
      timerId = null; // Reset the timer so it can be set again on next call
    }, interval);
  };
}

// Example usage
const throttledFunction = throttle(() => console.log('Function called'), 2000);

// Even if we try to call it many times in a short period, it will only execute every 2000 ms
setInterval(throttledFunction, 10);
```
