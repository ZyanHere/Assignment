### Synthetic Events in React.js

- A synthetic event in React.js <u>**_is a cross-browser wrapper around the browser's native event_**</u>.
- The <u>**_goal of synthetic events is to provide a consistent interface for handling events across different browsers,_**</u> abstracting away the differences in the underlying browser event systems

- This includes event methods and properties like <u>**_stopPropagation(), preventDefault(), target, and currentTarget_**</u>.

- If you need access to the underlying native event, <u>**_you can use the nativeEvent attribute of the synthetic event object_**</u>.

- Inside React event handlers, **_the event object is wrapped in a SyntheticEvent object_**. <u>These objects are pooled</u>, which means that the objects received at an event handler will be reused for other events to increase performance.

- This also means that **_accessing the event object's properties asynchronously will be impossible_** since the event's properties have been reset due to reuse.

```js
// The following piece of code will log null because event has been reused inside the SyntheticEvent pool:

function handleClick(event) {
  setTimeout(function () {
    console.log(event.target.name);
  }, 1000);
}
```

```js
// To avoid this we need to store the event's property:
function handleClick(event) {
  let name = event.target.name;
  setTimeout(function () {
    console.log(name);
  }, 1000);
}
```
