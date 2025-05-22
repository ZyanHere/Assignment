### Event Delegation

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Delegation Example</title>
  </head>
  <body>
    <div id="buttonContainer">
      <button class="btn">Button 1</button>
      <button class="btn">Button 2</button>
      <button class="btn">Button 3</button>
      <!-- More buttons can be added here -->
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

```js
//script.js

document.addEventListener('DOMContentLoaded', function () {
  // Attach event listener to the container
  document
    .getElementById('buttonContainer')
    .addEventListener('click', function (event) {
      // Check if the clicked element is a button
      if (event.target && event.target.nodeName === 'BUTTON') {
        console.log('Button clicked:', event.target.textContent);
      }
    });
});
```
