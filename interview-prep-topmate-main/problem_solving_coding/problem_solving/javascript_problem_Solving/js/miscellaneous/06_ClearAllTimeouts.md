## ClearAllTimeouts

**Approach Taken**

1. override the setTimeout to track the timeoutId's
2. clearAllTimeouts function is based on for of loop and each id is passed inside the clearTimeout(id)

```js
// Store the original setTimeout function
const _originalSetTimeout = window.setTimeout;

// Array to hold timeout IDs
const _timeoutIDs = new Set();

// Override setTimeout to track timeout IDs
window.setTimeout = function (callback, delay, ...args) {
  const timeoutID = _originalSetTimeout(callback, delay, ...args); //ex: 1 is the timeoutId that is added inside timeoutIds Set
  _timeoutIDs.add(timeoutID);
  //core logic is to return the timeoutId
  return timeoutID;
};

// Implement clearAllTimeouts
function clearAllTimeouts() {
  for (const id of _timeoutIDs) {
    clearTimeout(id);
  }
  _timeoutIDs.clear();
}

// Example usage
const timeout1 = setTimeout(() => console.log('This will not log.'), 1000);
const timeout2 = setTimeout(() => console.log('This will also not log.'), 2000);

// Clear all timeouts
clearAllTimeouts();

// New timeouts can still be set normally
const timeout3 = setTimeout(
  () => console.log('This will log after 3 seconds.'),
  3000
);
```
