### getElementsByStyle

- Implement a function getElementsByStyle(property, value) that returns all elements in the DOM that match that style
- e.g. getElementsByStyle('color', '#fff') will return all elements in the DOM with white text

**_Note:_** This method won't be 100% accurate in all cases(like :hover pseudo classes), but it should work for static styles

***Approach Taken:***
- const allElements = ***document.getElementsByTagName('*')***
- for of loop on allElements
- window.getComputedByStyle(eachElement)[colorProperty] === value, if true then resultArr.push(element)
- return result array

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test getElementsByStyle</title>
    <style>
      .red-text {
        color: red;
      }
      .white-text {
        color: white;
      }
      .blue-text {
        color: blue;
      }
      body {
        background-color: black;
      } /* for better visibility of white text */
    </style>
  </head>
  <body>
    <div class="red-text">Red Text</div>
    <div class="white-text">White Text</div>
    <div class="blue-text">Blue Text</div>
    <div style="color: white;">Inline White Text</div>
    <p class="white-text">Another White Text</p>

    <script src="index.js"></script>
  </body>
</html>
```

```js
function getElementsByStyle(property, value) {
  const allElements = document.getElementsByTagName('*');
  const matchingElements = [];

  for (let element of allElements) {
    if (window.getComputedByStyle(element)[property] === value) {
      matchingElements.push(element);
    }
  }

  return matchingElements;
}

//Example Usage:
document.addEventListener('DOMContentLoaded', function () {
  const whiteColoredElements = getElementsByStyle(
    'color',
    'rgb(255, 255, 255)'
  );
  console.log(whiteColoredElements);
});
```
