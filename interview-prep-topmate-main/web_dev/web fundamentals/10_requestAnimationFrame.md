### requestAnimationFrame

- The `window.requestAnimationFrame()` method **tells the browser you wish to perform an animation**.
- It <u>**_requests the browser to call a user-supplied callback function_**</u> before the next repaint.

```js
//Syntax:
requestAnimationFrame(callback);
```

```js
let element = document.getElementById('animate'); // Get the element to animate
let start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  let progress = timestamp - start;

  element.style.transform =
    'translateX(' + Math.min(progress / 10, 200) + 'px)'; // Move the element right

  if (progress < 2000) {
    // Continue for 2 seconds
    requestAnimationFrame(step);
  }
}

requestAnimationFrame(step);
```
