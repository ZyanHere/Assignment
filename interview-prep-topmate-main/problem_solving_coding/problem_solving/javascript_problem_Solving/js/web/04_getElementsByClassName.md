### getElementsByClassName()

```html
<!DOCTYPE html>
<html>
  <head>
    <title>getElementsByClassName Example</title>
  </head>
  <body>
    <div class="highlight">Item 1</div>
    <div class="highlight">Item 2</div>
    <p class="highlight">Item 3</p>
    <span>Item 4</span>
    <!-- This won't be affected as it doesn't have the 'highlight' class -->
    <div class="highlight">Item 5</div>

    <script src="script.js"></script>
  </body>
</html>
```

```js
document.addEventListener('DOMContentLoaded', function () {
  // Get all elements with the class 'highlight'
  var highlightElements = document.getElementsByClassName('highlight');

  // Loop through the HTMLCollection and change the background color of each element
  for (var i = 0; i < highlightElements.length; i++) {
    highlightElements[i].style.backgroundColor = 'yellow';
  }
});
```
