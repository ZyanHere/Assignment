### Implement setInterval polyfill

```js
let intervals = {};

function customSetInterval(callback, delay) {
  const start = performance.now();
  const id = Symbol('rafInterval');

  function loop(timestamp) {
    if (timestamp - start >= delay * (intervals[id]?.counter + 1)) {
      callback();
      intervals[id].counter++;
    }
    if (!intervals[id]?.stopped) {
      requestAnimationFrame(loop);
    }
  }

  intervals[id] = {
    counter: 0,
    stopped: false,
  };

  requestAnimationFrame(loop);
  return id;
}

function customClearInterval(id) {
  if (intervals[id]) {
    intervals[id].stopped = true;
    delete intervals[id];
  }
}

// Example usage:
const intervalId = customSetInterval(() => {
  console.log('This runs every 1000ms');
}, 1000);

// To stop the interval after 5 seconds:
setTimeout(() => {
  customClearInterval(intervalId);
  console.log('Interval stopped');
}, 5000);
```
