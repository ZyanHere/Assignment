### Implement getElementsByTagName

```html
<!DOCTYPE html>
<html>
  <head>
    <title>getElementsByTagName Example</title>
  </head>
  <body>
    <p>This is paragraph 1.</p>
    <p>This is paragraph 2.</p>
    <p>This is paragraph 3.</p>

    <script src="script.js"></script>
  </body>
</html>
```

```js
document.addEventListener('DOMContentLoaded', function () {
  // Get all paragraph elements
  var paragraphs = document.getElementsByTagName('p');

  // Loop through the NodeList and change the color of each paragraph
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = 'blue';
  }
});
```
